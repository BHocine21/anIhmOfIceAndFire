import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { getBooks } from 'services/getBooks';
import { createTestStore } from './test/testUtils';
import type { RawBook } from 'types/types';

import App from './App';

jest.mock('services/getBooks');
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, BrowserRouter: actual.MemoryRouter };
});

const mockedGetBooks = getBooks as jest.MockedFunction<typeof getBooks>;

describe('App', () => {
  it('renders the header and the book list once books are fetched', async () => {
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

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByAltText('A Song of Ice and Fire')).toBeInTheDocument();
    expect(await screen.findByText('A Game of Thrones')).toBeInTheDocument();
  });
});
