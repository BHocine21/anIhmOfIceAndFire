import { screen } from '@testing-library/react';

import MainContainer from 'components/MainContainer/MainContainer';
import { renderWithProviders } from '../../test/testUtils';
import type { Book } from 'types/types';

const book: Book = {
  id: 1,
  name: 'A Game of Thrones',
  authors: 'George R. R. Martin',
  numberOfPages: 694,
  publisher: 'Bantam Books',
  country: 'United States',
  released: '06/08/1996',
  characterUrls: [],
};

describe('MainContainer', () => {
  it('shows a loading state while books are being fetched', () => {
    renderWithProviders(<MainContainer />, {
      preloadedState: { books: { books: [], status: 'loading', error: null } },
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error state when fetching books failed', () => {
    renderWithProviders(<MainContainer />, {
      preloadedState: { books: { books: [], status: 'failed', error: 'Network error' } },
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
  });

  it('shows an empty state when there are no books', () => {
    renderWithProviders(<MainContainer />, {
      preloadedState: { books: { books: [], status: 'succeeded', error: null } },
    });

    expect(screen.getByText('No books found.')).toBeInTheDocument();
  });

  it('shows the list of books once fetched successfully', () => {
    renderWithProviders(<MainContainer />, {
      preloadedState: { books: { books: [book], status: 'succeeded', error: null } },
    });

    expect(screen.getByText('A Game of Thrones')).toBeInTheDocument();
  });
});
