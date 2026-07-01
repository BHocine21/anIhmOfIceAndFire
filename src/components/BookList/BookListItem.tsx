import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import type { Book } from 'types/types';

export interface BookListItemProps {
  book: Book;
  index?: number;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

import { BOOK_COVERS } from 'constants/bookCovers';

const coverSvg = (book: Book, vol: string) => {
  const title = book.name.toUpperCase();
  const FONT = 'Georgia, serif';
  const words = title.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > 11) { lines.push(cur.trim()); cur = w; }
    else cur += ' ' + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  const y0 = 470 - (lines.length - 1) * 22;
  const tsp = lines.map((ln, i) =>
    `<text x='200' y='${y0 + i * 44}' fill='%23f0e3c2' font-family='${FONT}' font-size='30' letter-spacing='2' text-anchor='middle'>${ln}</text>`,
  ).join('');
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'><defs><linearGradient id='g' x1='0' y1='0' x2='.5' y2='1'><stop offset='0' stop-color='%232e2417'/><stop offset='1' stop-color='%23120e08'/></linearGradient></defs><rect width='400' height='600' fill='url(%23g)'/><rect x='16' y='16' width='368' height='568' fill='none' stroke='%23b08d3f' stroke-width='1.5' opacity='.7'/><rect x='23' y='23' width='354' height='554' fill='none' stroke='%23b08d3f' stroke-width='.5' opacity='.4'/><text x='200' y='96' fill='%23caa24a' font-family='${FONT}' font-size='18' letter-spacing='7' text-anchor='middle'>BOOK ${vol}</text><text x='200' y='322' fill='%23745d2f' font-family='${FONT}' font-size='150' text-anchor='middle'>✦</text><line x1='150' y1='402' x2='250' y2='402' stroke='%23b08d3f' stroke-width='1' opacity='.6'/>${tsp}</svg>`,
  )}`;
};

export const BookListItem = ({ book, index = 0 }: BookListItemProps) => {
  const vol = ROMAN[index] ?? String(index + 1);
  const realCover = BOOK_COVERS[book.name];
  return (
    <Box
      component={Link}
      to={`/book/${book.id}`}
      sx={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        background: '#f4ecd6',
        border: '1px solid rgba(43,34,24,.14)', borderRadius: '4px',
        p: '18px',
        boxShadow: '0 10px 30px -18px rgba(43,34,24,.5)',
        transition: 'translate .4s ease, box-shadow .4s ease',
        '&:hover': { translate: '0 -10px', boxShadow: '0 30px 50px -22px rgba(43,34,24,.7)' },
      }}
    >
      {/* Cover image */}
      <Box sx={{ position: 'relative', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 14px 30px -16px rgba(0,0,0,.7)', aspectRatio: '2/3' }}>
        <Box
          component="img"
          src={realCover ?? coverSvg(book, vol)}
          alt={`${book.name} cover`}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = coverSvg(book, vol);
          }}
          sx={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
        />
        <Box sx={{
          position: 'absolute', top: 10, left: 10,
          background: 'rgba(20,16,9,.78)', color: '#e8cf8e',
          fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '.18em',
          px: '9px', py: '5px', borderRadius: '2px',
        }}>
          Book {vol}
        </Box>
      </Box>

      {/* Title */}
      <Typography sx={{ fontFamily: '"Cinzel", serif', fontWeight: 700, fontSize: 18, mt: 2, mb: 0.5, color: '#241c12', lineHeight: 1.15 }}>
        {book.name}
      </Typography>

      {/* Author + date (kept for test: "George R. R. Martin — 06/08/1996") */}
      <Typography sx={{ fontSize: 13, color: '#8a6d2c', letterSpacing: '.08em', fontFamily: '"Cinzel", serif' }}>
        {`${book.authors} — ${book.released}`}
      </Typography>

      <Typography sx={{ display: 'inline-block', mt: 1.5, fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#6b1f24' }}>
        Read more →
      </Typography>
    </Box>
  );
};
