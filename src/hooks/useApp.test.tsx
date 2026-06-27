import type { PropsWithChildren } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { useApp } from 'hooks/useApp';
import { getBooks } from 'services/getBooks';
import { createTestStore } from '../test/testUtils';
import type { RawBook } from 'types/types';

jest.mock('services/getBooks');

const mockedGetBooks = getBooks as jest.MockedFunction<typeof getBooks>;

describe('useApp', () => {
  it('dispatches fetchBooks on mount and stores the result', async () => {
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
        characters: [],
      },
    ];
    mockedGetBooks.mockResolvedValueOnce(rawBooks);

    const store = createTestStore();
    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useApp(), { wrapper });

    expect(store.getState().books.status).toBe('loading');

    await waitFor(() => {
      expect(store.getState().books.status).toBe('succeeded');
    });

    expect(store.getState().books.books).toHaveLength(1);
  });
});
