import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import BookDetails from 'components/BookDetails/BookDetails';
import { getCharacter } from 'services/getCharacter';
import { createTestStore } from '../../test/testUtils';
import type { Book } from 'types/types';

jest.mock('services/getCharacter');

const mockedGetCharacter = getCharacter as jest.MockedFunction<typeof getCharacter>;

const book: Book = {
  id: 1,
  name: 'A Game of Thrones',
  authors: 'George R. R. Martin',
  numberOfPages: 694,
  publisher: 'Bantam Books',
  country: 'United States',
  released: '06/08/1996',
  characterUrls: ['https://anapioficeandfire.com/api/characters/1'],
};

const renderBookDetails = (initialPath: string, books: Book[]) => {
  const store = createTestStore({ books: { books, status: 'succeeded', error: null } });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('BookDetails', () => {
  it('shows the resolved book details once characters are loaded', async () => {
    mockedGetCharacter.mockResolvedValueOnce({
      url: book.characterUrls[0] as string,
      name: 'Eddard Stark',
    });

    renderBookDetails('/book/1', [book]);

    expect(await screen.findByText('A Game of Thrones')).toBeInTheDocument();
    expect(await screen.findByText('Eddard Stark')).toBeInTheDocument();
  });

  it('shows an empty state when the book id does not exist', async () => {
    renderBookDetails('/book/999', [book]);

    expect(await screen.findByText('This book could not be found.')).toBeInTheDocument();
  });
});
