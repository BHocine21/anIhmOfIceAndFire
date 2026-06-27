import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { BookListItem } from 'components/BookList/BookListItem';
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

describe('BookListItem', () => {
  it('renders the book title, authors and release date as a link to its details page', () => {
    render(
      <MemoryRouter>
        <BookListItem book={book} />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /a game of thrones/i });
    expect(link).toHaveAttribute('href', '/book/1');
    expect(screen.getByText(/George R\. R\. Martin — 06\/08\/1996/)).toBeInTheDocument();
  });
});
