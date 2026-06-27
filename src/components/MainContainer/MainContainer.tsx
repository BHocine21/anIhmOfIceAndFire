import { BookList } from 'components/BookList/BookList';
import { EmptyState } from 'components/states/EmptyState';
import { ErrorState } from 'components/states/ErrorState';
import { LoadingState } from 'components/states/LoadingState';
import { useMainContainer } from 'hooks/useMainContainer';

const MainContainer = () => {
  const { books, status, error } = useMainContainer();

  if (status === 'idle' || status === 'loading') {
    return <LoadingState />;
  }

  if (status === 'failed') {
    return <ErrorState message={error ?? undefined} />;
  }

  if (books.length === 0) {
    return <EmptyState message="No books found." />;
  }

  return <BookList books={books} />;
};

export default MainContainer;
