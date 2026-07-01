import { Box, Typography } from '@mui/material';

import gotHeader from 'assets/gotHeader.png';

const DragonSvg = () => (
  <svg viewBox="0 0 200 100" width="160" height="80" fill="currentColor">
    <path d="M10 60 C40 40 60 50 90 30 C95 45 110 48 120 40 C112 56 95 60 95 60 C120 58 150 44 190 22 C160 56 130 66 110 66 C95 80 70 78 60 66 C44 70 24 68 10 60Z" />
  </svg>
);

const heroBg = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'><defs><radialGradient id='s' cx='.5' cy='0' r='1.1'><stop offset='0' stop-color='#5b5238'/><stop offset='.35' stop-color='#2c2618'/><stop offset='1' stop-color='#0d0a06'/></radialGradient></defs><rect width='1600' height='900' fill='url(#s)'/><circle cx='800' cy='150' r='110' fill='#e7d6a8' opacity='.10'/><circle cx='800' cy='150' r='190' fill='none' stroke='#e7d6a8' stroke-width='1' opacity='.06'/></svg>",
)}`;

export const HeroSection = () => (
  <Box
    id="top"
    component="header"
    sx={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    {/* Background */}
    <Box
      sx={{
        position: 'absolute', inset: '-8% -4% 0 -4%', zIndex: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        width: '108%',
      }}
    />

    {/* Dark gradient overlay */}
    <Box sx={{
      position: 'absolute', inset: 0, zIndex: 1,
      background: 'linear-gradient(180deg, rgba(20,16,9,.65) 0%, rgba(20,16,9,.3) 30%, rgba(231,217,184,.15) 62%, rgba(231,217,184,.9) 100%)',
    }} />
    <Box sx={{
      position: 'absolute', inset: 0, zIndex: 1,
      background: 'radial-gradient(70% 60% at 50% 42%, transparent 40%, rgba(20,16,9,.45) 100%)',
    }} />

    {/* Dragon 1 */}
    <Box sx={{
      position: 'absolute', top: '16%', left: '12%', zIndex: 2,
      color: 'rgba(20,16,9,.34)',
      animation: 'dragonDrift 14s ease-in-out infinite',
    }}>
      <DragonSvg />
    </Box>

    {/* Dragon 2 */}
    <Box sx={{
      position: 'absolute', top: '24%', right: '14%', zIndex: 2,
      color: 'rgba(20,16,9,.26)',
      animation: 'dragonDrift 18s ease-in-out infinite reverse',
    }}>
      <svg viewBox="0 0 200 100" width="120" height="60" fill="currentColor">
        <path d="M10 60 C40 40 60 50 90 30 C95 45 110 48 120 40 C112 56 95 60 95 60 C120 58 150 44 190 22 C160 56 130 66 110 66 C95 80 70 78 60 66 C44 70 24 68 10 60Z" />
      </svg>
    </Box>

    {/* Content */}
    <Box sx={{ position: 'relative', zIndex: 3, textAlign: 'center', px: 3, maxWidth: 1000 }}>
      {/* Logo */}
      <Box component="img"
        src={gotHeader}
        alt="Game of Thrones"
        sx={{ width: 'min(78vw, 320px)', height: 'auto', display: 'block', mx: 'auto', mb: 3, filter: 'invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.05)' }}
      />

      {/* Subtitle line */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ height: 1, width: 64, background: 'linear-gradient(90deg,transparent,#d8b65a)' }} />
        <Typography sx={{ fontFamily: '"Cinzel", serif', letterSpacing: '.42em', fontSize: 12, color: '#e8cf8e', textTransform: 'uppercase' }}>
          A Chronicle of Westeros
        </Typography>
        <Box sx={{ height: 1, width: 64, background: 'linear-gradient(90deg,#d8b65a,transparent)' }} />
      </Box>

      {/* Main title */}
      <Typography
        component="h1"
        sx={{
          fontFamily: '"Cinzel", serif', fontWeight: 900,
          fontSize: 'clamp(44px, 8vw, 118px)', lineHeight: .96,
          color: '#f6ecd2', textShadow: '0 4px 40px rgba(0,0,0,.55)',
          letterSpacing: '.02em', m: 0,
        }}
      >
        A Song of
        <br />
        <Box component="span" sx={{
          background: 'linear-gradient(90deg,#caa24a,#f4e4ad,#caa24a)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: 'shimmer 6s linear infinite',
        }}>
          Ice &amp; Fire
        </Box>
      </Typography>

      {/* Description */}
      <Typography sx={{
        fontFamily: '"EB Garamond", serif',
        fontSize: 'clamp(17px, 2vw, 22px)',
        maxWidth: 620, mx: 'auto', mt: 3.5, mb: 5,
        color: '#efe2c4', lineHeight: 1.6,
      }}>
        Five novels. Seven kingdoms. A thousand swords between a boy and the Iron Throne —
        and a winter with no end at the edge of the world.
      </Typography>

      {/* CTA buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Box
          component="a"
          href="#saga"
          sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 600, letterSpacing: '.14em',
            textTransform: 'uppercase', fontSize: 13, textDecoration: 'none',
            color: '#1a140a',
            background: 'linear-gradient(180deg,#e7cf86,#c4a04a)',
            px: '34px', py: '16px', borderRadius: '2px',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,.6)',
            transition: 'filter .3s ease',
            '&:hover': { filter: 'brightness(1.1)' },
          }}
        >
          Enter the Saga
        </Box>
        <Box
          component="a"
          href="#houses"
          sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 600, letterSpacing: '.14em',
            textTransform: 'uppercase', fontSize: 13, textDecoration: 'none',
            color: '#f3e9cf',
            border: '1px solid rgba(243,233,207,.5)',
            px: '34px', py: '16px', borderRadius: '2px',
            transition: 'border-color .3s ease',
            '&:hover': { borderColor: 'rgba(243,233,207,.9)' },
          }}
        >
          The Great Houses
        </Box>
      </Box>
    </Box>

    {/* Scroll cue */}
    <Box
      component="a"
      href="#saga"
      sx={{
        position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
        textDecoration: 'none', color: '#2b2218',
      }}
    >
      <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '.35em', textTransform: 'uppercase', opacity: .7 }}>
        Descend
      </Typography>
      <Box sx={{ fontSize: 18, animation: 'cueDrop 2s ease-in-out infinite' }}>↓</Box>
    </Box>
  </Box>
);
