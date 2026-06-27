import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getBooks } from 'services/getBooks';
import { formatDate } from 'utils/formatDate';
import type { Book, FetchStatus } from 'types/types';

export interface BooksState {
  books: Book[];
  status: FetchStatus;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  status: 'idle',
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const rawBooks = await getBooks();

  return rawBooks.map((book, index): Book => ({
    id: index + 1,
    name: book.name,
    authors: book.authors.join(', '),
    numberOfPages: book.numberOfPages,
    publisher: book.publisher,
    country: book.country,
    released: formatDate(book.released),
    characterUrls: book.characters,
  }));
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default booksSlice.reducer;
