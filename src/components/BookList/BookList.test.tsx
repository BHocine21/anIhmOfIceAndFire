import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { BookList } from 'components/BookList/BookList';
import type { Book } from 'types/types';

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
  {
    id: 2,
    name: 'A Clash of Kings',
    authors: 'George R. R. Martin',
    numberOfPages: 768,
    publisher: 'Bantam Books',
    country: 'United States',
    released: '16/11/1998',
    characterUrls: [],
  },
];

describe('BookList', () => {
  it('renders one entry per book', () => {
    render(
      <MemoryRouter>
        <BookList books={books} />
      </MemoryRouter>,
    );

    const list = screen.getByRole('list', { name: /books list/i });
    expect(list.querySelectorAll('a')).toHaveLength(2);
    expect(screen.getByText('A Game of Thrones')).toBeInTheDocument();
    expect(screen.getByText('A Clash of Kings')).toBeInTheDocument();
  });
});
