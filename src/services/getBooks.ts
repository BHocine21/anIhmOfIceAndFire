import axios from 'axios';

import { BOOKS_API_URL } from 'constants/api';
import type { RawBook } from 'types/types';

export const getBooks = async (): Promise<RawBook[]> => {
  const { data } = await axios.get<RawBook[]>(BOOKS_API_URL);

  return data;
};
