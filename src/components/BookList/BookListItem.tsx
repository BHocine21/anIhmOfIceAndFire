import { ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import type { Book } from 'types/types';

export interface BookListItemProps {
  book: Book;
}

export const BookListItem = ({ book }: BookListItemProps) => (
  <ListItemButton component={Link} to={`/book/${book.id}`} divider>
    <ListItemText
      primary={book.name}
      secondary={`${book.authors} — ${book.released}`}
      slotProps={{ primary: { variant: 'h6' } }}
    />
  </ListItemButton>
);
