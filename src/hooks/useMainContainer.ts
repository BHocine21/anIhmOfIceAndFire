import { useAppSelector } from 'store/hooks';
import type { Book, FetchStatus } from 'types/types';

export interface UseMainContainerResult {
  books: Book[];
  status: FetchStatus;
  error: string | null;
}

export const useMainContainer = (): UseMainContainerResult => {
  const { books, status, error } = useAppSelector((state) => state.books);

  return { books, status, error };
};
