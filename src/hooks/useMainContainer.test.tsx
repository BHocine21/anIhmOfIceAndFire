import type { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';

import { useMainContainer } from 'hooks/useMainContainer';
import { createTestStore } from '../test/testUtils';
import type { Book } from 'types/types';

describe('useMainContainer', () => {
  it('returns the books, status and error from the store', () => {
    const books: Book[] = [
      {
        id: 1,
        name: 'A Game of Thrones',
        authors: 'George R. R. Martin',
        numberOfPages: 694,
        publisher: 'Bantam Books',
        country: 'United States',
        released: '06/08/1996',
        characterUrls: [],
      },
    ];
    const store = createTestStore({ books: { books, status: 'succeeded', error: null } });
    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useMainContainer(), { wrapper });

    expect(result.current).toEqual({ books, status: 'succeeded', error: null });
  });
});
