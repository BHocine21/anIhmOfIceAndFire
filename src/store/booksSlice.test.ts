import booksReducer, { fetchBooks, type BooksState } from 'store/booksSlice';
import { getBooks } from 'services/getBooks';
import type { RawBook } from 'types/types';

jest.mock('services/getBooks');

const mockedGetBooks = getBooks as jest.MockedFunction<typeof getBooks>;

const initialState: BooksState = { books: [], status: 'idle', error: null };

describe('booksSlice', () => {
  it('returns the initial state for an unknown action', () => {
    expect(booksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('sets status to loading when fetchBooks is pending', () => {
    const state = booksReducer(initialState, { type: fetchBooks.pending.type });

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('stores parsed books and sets status to succeeded when fetchBooks fulfills', async () => {
    const rawBooks: RawBook[] = [
      {
        url: 'https://anapioficeandfire.com/api/books/1',
        name: 'A Game of Thrones',
        isbn: '0-553-10354-7',
        authors: ['George R. R. Martin'],
        numberOfPages: 694,
        publisher: 'Bantam Books',
        country: 'United States',
        mediaType: 'Hardcover',
        released: '1996-08-06',
        characters: ['https://anapioficeandfire.com/api/characters/1'],
      },
    ];

    mockedGetBooks.mockResolvedValueOnce(rawBooks);

    const thunkDispatch = jest.fn();
    const thunkResult = await fetchBooks()(thunkDispatch, () => undefined, undefined);

    const state = booksReducer(initialState, thunkResult);

    expect(state.status).toBe('succeeded');
    expect(state.books).toEqual([
      {
        id: 1,
        name: 'A Game of Thrones',
        authors: 'George R. R. Martin',
        numberOfPages: 694,
        publisher: 'Bantam Books',
        country: 'United States',
        released: '06/08/1996',
        characterUrls: ['https://anapioficeandfire.com/api/characters/1'],
      },
    ]);
  });

  it('sets status to failed and stores the error message when fetchBooks rejects', () => {
    const action = {
      type: fetchBooks.rejected.type,
      error: { message: 'Network Error' },
    };

    const state = booksReducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network Error');
  });
});
