import { List, Paper } from '@mui/material';

import { BookListItem } from 'components/BookList/BookListItem';
import type { Book } from 'types/types';

export interface BookListProps {
  books: Book[];
}

export const BookList = ({ books }: BookListProps) => (
  <Paper
    elevation={3}
    sx={{ maxWidth: 560, mx: 'auto', mt: 5, mb: 5, bgcolor: 'rgba(21,21,26,0.85)' }}
  >
    <List aria-label="Books list">
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </List>
  </Paper>
);
