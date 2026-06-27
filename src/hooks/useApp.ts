import { useEffect } from 'react';

import { useAppDispatch } from 'store/hooks';
import { fetchBooks } from 'store/booksSlice';

export const useApp = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchBooks());
  }, [dispatch]);
};
