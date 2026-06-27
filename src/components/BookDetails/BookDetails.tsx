import { BookDetailsTable } from 'components/BookDetails/BookDetailsTable';
import { EmptyState } from 'components/states/EmptyState';
import { ErrorState } from 'components/states/ErrorState';
import { LoadingState } from 'components/states/LoadingState';
import { useBookDetails } from 'hooks/useBookDetails';

const BookDetails = () => {
  const { bookDetails, status } = useBookDetails();

  if (status === 'idle' || status === 'loading') {
    return <LoadingState rows={7} />;
  }

  if (status === 'failed') {
    return <ErrorState message="Unable to load this book's details." />;
  }

  if (status === 'not-found' || !bookDetails) {
    return <EmptyState message="This book could not be found." />;
  }

  return <BookDetailsTable bookDetails={bookDetails} />;
};

export default BookDetails;
