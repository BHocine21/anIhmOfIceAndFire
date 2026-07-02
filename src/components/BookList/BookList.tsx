import { Box } from '@mui/material';

import { BookListItem } from 'components/BookList/BookListItem';
import type { Book } from 'types/types';

export interface BookListProps {
  books: Book[];
}

export const BookList = ({ books }: BookListProps) => (
  <Box
    component="ul"
    aria-label="Books list"
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
      gap: '30px',
      listStyle: 'none',
      m: 0, p: 0,
    }}
  >
    {books.map((book, index) => (
      <Box component="li" key={book.id} sx={{ listStyle: 'none' }}>
        <BookListItem book={book} index={index} />
      </Box>
    ))}

    {/* "Coming soon" placeholder */}
    <Box
      component="li"
      sx={{
        border: '1px dashed rgba(43,34,24,.32)', borderRadius: '4px', p: '18px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', minHeight: 200, listStyle: 'none',
      }}
    >
      <Box sx={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 30, color: '#9a7b3f' }}>✦</Box>
      <Box sx={{ fontFamily: '"Cinzel", serif', fontWeight: 700, fontSize: 17, mt: 1.5, mb: 0.5, color: '#241c12' }}>
        The Winds of Winter
      </Box>
      <Box sx={{ fontFamily: '"Cinzel", serif', fontSize: 12, color: '#8a6d2c', letterSpacing: '.1em', textTransform: 'uppercase' }}>
        Forthcoming
      </Box>
      <Box sx={{ fontSize: 13.5, lineHeight: 1.5, color: '#5a4d3a', mt: 1.5 }}>
        The sixth volume. Winter, at last, descends in full.
      </Box>
    </Box>
  </Box>
);
