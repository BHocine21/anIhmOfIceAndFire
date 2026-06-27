import axios from 'axios';

import { BOOKS_API_URL } from 'constants/api';
import { getBooks } from 'services/getBooks';
import type { RawBook } from 'types/types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getBooks', () => {
  it('fetches books from the API and returns the response data', async () => {
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

    mockedAxios.get.mockResolvedValueOnce({ data: rawBooks });

    const result = await getBooks();

    expect(mockedAxios.get).toHaveBeenCalledWith(BOOKS_API_URL);
    expect(result).toEqual(rawBooks);
  });
});
