import { Box, Typography } from '@mui/material';

import { CharacterList } from 'components/BookDetails/CharacterList';
import { BOOK_COVERS } from 'constants/bookCovers';
import type { BookDetailsViewModel } from 'types/types';

export interface BookDetailsTableProps {
  bookDetails: BookDetailsViewModel;
}

const ROWS = [
  { label: 'Author', key: 'authors' },
  { label: 'Release date', key: 'released' },
  { label: 'Pages', key: 'numberOfPages' },
  { label: 'Country', key: 'country' },
  { label: 'Publisher', key: 'publisher' },
] as const;

const coverSvg = (name: string) => {
  const title = name.toUpperCase();
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
    `<text x='200' y='${y0 + i * 44}' fill='%23f0e3c2' font-family='Georgia,serif' font-size='30' letter-spacing='2' text-anchor='middle'>${ln}</text>`,
  ).join('');
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'><defs><linearGradient id='g' x1='0' y1='0' x2='.5' y2='1'><stop offset='0' stop-color='%232e2417'/><stop offset='1' stop-color='%23120e08'/></linearGradient></defs><rect width='400' height='600' fill='url(%23g)'/><rect x='16' y='16' width='368' height='568' fill='none' stroke='%23b08d3f' stroke-width='1.5' opacity='.7'/><text x='200' y='322' fill='%23745d2f' font-family='Georgia,serif' font-size='150' text-anchor='middle'>✦</text><line x1='150' y1='402' x2='250' y2='402' stroke='%23b08d3f' stroke-width='1' opacity='.6'/>${tsp}</svg>`,
  )}`;
};

export const BookDetailsTable = ({ bookDetails }: BookDetailsTableProps) => {
  const realCover = BOOK_COVERS[bookDetails.name];

  return (
    <Box sx={{ maxWidth: 980, mx: 'auto', px: 'clamp(20px,5vw,40px)', pt: 2, pb: 10 }}>
      <Box sx={{
        background: 'linear-gradient(150deg, #f8f0dc 0%, #ede0c2 60%, #e4d6b2 100%)',
        border: '1px solid rgba(200,162,74,.35)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px -20px rgba(43,34,24,.3), 0 0 0 1px rgba(216,182,90,.12)',
      }}>

        {/* ── Top section: cover + metadata ── */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start' }}>

          {/* Cover */}
          <Box sx={{
            flexShrink: 0,
            width: { xs: '100%', sm: '300px' },
            background: '#0f0c07',
            borderRight: { sm: '1px solid rgba(216,182,90,.2)' },
            borderBottom: { xs: '1px solid rgba(216,182,90,.2)', sm: 'none' },
          }}>
            <Box
              component="img"
              src={realCover ?? coverSvg(bookDetails.name)}
              alt={`${bookDetails.name} cover`}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = coverSvg(bookDetails.name);
              }}
              sx={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Box>

          {/* Metadata */}
          <Box sx={{ flex: 1, minWidth: 0, p: { xs: '36px 28px', sm: '52px 56px 48px' } }}>

            {/* Kicker */}
            <Typography sx={{
              fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '.5em',
              textTransform: 'uppercase', color: '#9a7b3f',
            }}>
              A Song of Ice and Fire
            </Typography>

            {/* Title */}
            <Typography variant="h1" sx={{
              fontFamily: '"Cinzel", serif', fontWeight: 900,
              fontSize: 'clamp(26px,4vw,46px)', mt: 1.5, mb: 0,
              color: '#1a130a', lineHeight: 1.05, letterSpacing: '.01em',
            }}>
              {bookDetails.name}
            </Typography>

            {/* Ornamental divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', my: '28px' }}>
              <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(180,140,60,.7), rgba(180,140,60,.1))' }} />
              <Typography sx={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 12, color: '#b08d3f', lineHeight: 1 }}>✦</Typography>
              <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(180,140,60,.1), rgba(180,140,60,.7))' }} />
            </Box>

            {/* Metadata rows */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {ROWS.map(({ label, key }, i) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    py: '13px',
                    borderBottom: i < ROWS.length - 1 ? '1px solid rgba(43,34,24,.08)' : 'none',
                    gap: '16px',
                  }}
                >
                  <Typography sx={{
                    fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '.22em',
                    textTransform: 'uppercase', color: '#9a7b3f', flexShrink: 0,
                  }}>
                    {label}
                  </Typography>
                  <Typography sx={{
                    fontSize: 17, color: '#241c12', fontFamily: '"EB Garamond", serif',
                    fontWeight: 500, textAlign: 'right',
                  }}>
                    {String(bookDetails[key])}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Characters section — full width ── */}
        <Box sx={{
          borderTop: '1px solid rgba(200,162,74,.25)',
          background: 'rgba(43,34,24,.025)',
          px: { xs: '28px', sm: '56px' },
          py: '36px',
        }}>
          {/* Decorative section header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', mb: '24px' }}>
            <Box sx={{ flex: 1, height: '1px', background: 'rgba(180,140,60,.3)' }} />
            <Typography sx={{
              fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '.45em',
              textTransform: 'uppercase', color: '#9a7b3f', whiteSpace: 'nowrap',
            }}>
              ✦ Characters ✦
            </Typography>
            <Box sx={{ flex: 1, height: '1px', background: 'rgba(180,140,60,.3)' }} />
          </Box>

          <CharacterList characters={bookDetails.characters} />
        </Box>
      </Box>
    </Box>
  );
};
