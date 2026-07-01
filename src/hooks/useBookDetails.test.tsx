import type { PropsWithChildren } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useBookDetails } from 'hooks/useBookDetails';
import { getBookCharacters } from 'services/getBookCharacters';
import { createTestStore } from '../test/testUtils';
import type { Book } from 'types/types';

jest.mock('services/getBookCharacters');

const mockedGetBookCharacters = getBookCharacters as jest.MockedFunction<typeof getBookCharacters>;

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

const createWrapper = (initialPath: string, books: Book[]) => {
  const store = createTestStore({ books: { books, status: 'succeeded', error: null } });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/book/:bookId" element={children} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  return Wrapper;
};

describe('useBookDetails', () => {
  it('resolves character names and returns the book details', async () => {
    mockedGetBookCharacters.mockResolvedValueOnce(['Eddard Stark']);

    const { result } = renderHook(() => useBookDetails(), {
      wrapper: createWrapper('/book/1', [book]),
    });

    expect(result.current.status).toBe('loading');

    await waitFor(() => {
      expect(result.current.status).toBe('succeeded');
    });

    expect(result.current.bookDetails?.characters).toEqual(['Eddard Stark']);
  });

  it('returns not-found when no book matches the route id', async () => {
    const { result } = renderHook(() => useBookDetails(), {
      wrapper: createWrapper('/book/999', [book]),
    });

    await waitFor(() => {
      expect(result.current.status).toBe('not-found');
    });
  });

  it('returns failed when fetching character names fails', async () => {
    mockedGetBookCharacters.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useBookDetails(), {
      wrapper: createWrapper('/book/1', [book]),
    });

    await waitFor(() => {
      expect(result.current.status).toBe('failed');
    });
  });
});
