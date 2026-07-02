import { Box, Typography } from '@mui/material';

export const FooterSection = () => (
  <Box
    component="footer"
    sx={{
      position: 'relative', zIndex: 2,
      py: '80px', px: '40px',
      textAlign: 'center',
    }}
  >
    {/* Ornament */}
    <Typography sx={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 34, color: '#9a7b3f', mb: 2 }}>
      ✦
    </Typography>

    {/* Motto */}
    <Typography sx={{ fontFamily: '"Cinzel", serif', letterSpacing: '.36em', fontSize: 14, textTransform: 'uppercase', color: '#3a2f20' }}>
      Valar Morghulis
    </Typography>

    {/* Description */}
    <Typography sx={{ maxWidth: 460, mx: 'auto', mt: 2, fontSize: 15, lineHeight: 1.6, color: '#6b5d46' }}>
      All men must die. But first, they must read. A tribute to George R. R. Martin&apos;s{' '}
      <em>A Song of Ice and Fire</em>.
    </Typography>

    {/* Nav links */}
    <Box sx={{ display: 'flex', gap: '26px', justifyContent: 'center', mt: 4 }}>
      {[
        { label: 'Saga', href: '#saga' },
        { label: 'Houses', href: '#houses' },
        { label: 'Characters', href: '#characters' },
        { label: 'Realm', href: '#realm' },
      ].map((l) => (
        <Box
          key={l.label}
          component="a"
          href={l.href}
          sx={{
            fontFamily: '"Cinzel", serif', fontSize: 12, letterSpacing: '.16em',
            textTransform: 'uppercase', textDecoration: 'none', color: '#6b1f24',
            '&:hover': { color: '#9a2f34' },
          }}
        >
          {l.label}
        </Box>
      ))}
    </Box>
  </Box>
);
