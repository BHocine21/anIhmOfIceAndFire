import { render, screen } from '@testing-library/react';

import { BookDetailsTable } from 'components/BookDetails/BookDetailsTable';
import type { BookDetailsViewModel } from 'types/types';

const bookDetails: BookDetailsViewModel = {
  id: 1,
  name: 'A Game of Thrones',
  authors: 'George R. R. Martin',
  numberOfPages: 694,
  publisher: 'Bantam Books',
  country: 'United States',
  released: '06/08/1996',
  characters: ['Eddard Stark'],
};

describe('BookDetailsTable', () => {
  it('renders every field of the book details', () => {
    render(<BookDetailsTable bookDetails={bookDetails} />);

    expect(screen.getByText('A Game of Thrones')).toBeInTheDocument();
    expect(screen.getByText('George R. R. Martin')).toBeInTheDocument();
    expect(screen.getByText('06/08/1996')).toBeInTheDocument();
    expect(screen.getByText('694')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Bantam Books')).toBeInTheDocument();
    expect(screen.getByText('Eddard Stark')).toBeInTheDocument();
  });
});
