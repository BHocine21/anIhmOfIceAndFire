import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import gotHeader from 'assets/gotHeader.png';

const NAV_LINKS = [
  { label: 'The Saga', href: '#saga' },
  { label: 'Houses', href: '#houses' },
  { label: 'Characters', href: '#characters' },
  { label: 'The Realm', href: '#realm' },
];

export const AppHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const onHeroPage = location.pathname === '/';
  // On non-home pages, always use the opaque style (dark ink on parchment)
  const isOpaque = !onHeroPage || scrolled;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onResize = () => {
      const m = window.innerWidth < 760;
      setIsMobile(m);
      if (!m) setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onResize();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const ink = isOpaque ? '#3a2f20' : '#f1e6c8';
  const accent = isOpaque ? '#8a6d2c' : '#e8cf8e';

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 'clamp(20px, 5vw, 48px)',
          py: scrolled ? '14px' : '24px',
          background: isOpaque ? 'rgba(231,217,184,.92)' : 'transparent',
          backdropFilter: isOpaque ? 'blur(10px)' : 'none',
          borderBottom: `1px solid ${isOpaque ? 'rgba(43,34,24,.14)' : 'transparent'}`,
          boxShadow: isOpaque ? '0 10px 30px -20px rgba(43,34,24,.5)' : 'none',
          transition: 'all .4s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" aria-label="Back to home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{
            display: 'inline-flex', width: 34, height: 34, alignItems: 'center', justifyContent: 'center',
            border: `1.5px solid ${accent}`, borderRadius: '50%', color: accent,
            fontFamily: '"Cinzel Decorative", serif', fontWeight: 900, fontSize: 16,
            transition: 'all .4s ease',
          }}>
            ✦
          </Box>
          <Box sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 700, letterSpacing: '.28em', fontSize: 14,
            color: ink, textShadow: scrolled ? 'none' : '0 1px 10px rgba(0,0,0,.55)',
            transition: 'color .4s ease',
          }}>
            ICE &amp; FIRE
          </Box>
          <img src={gotHeader} alt="A Song of Ice and Fire" style={{ display: 'none' }} />
        </Link>

        {/* Desktop nav links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '34px' }}>
            {NAV_LINKS.map((l) => (
              <Box
                key={l.label}
                component="a"
                href={l.href}
                sx={{
                  fontFamily: '"Cinzel", serif', fontSize: '12.5px', letterSpacing: '.18em',
                  textTransform: 'uppercase', textDecoration: 'none', color: ink,
                  textShadow: scrolled ? 'none' : '0 1px 10px rgba(0,0,0,.55)',
                  transition: 'color .4s ease',
                  '&:hover': { color: accent },
                }}
              >
                {l.label}
              </Box>
            ))}
          </Box>
        )}

        {/* Mobile burger */}
        {isMobile && (
          <Box
            component="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isOpaque ? 'none' : 'rgba(20,16,9,.3)',
              border: `1px solid ${isOpaque ? 'rgba(43,34,24,.3)' : 'rgba(241,230,200,.5)'}`,
              color: ink, width: 42, height: 42, borderRadius: '8px',
              fontSize: 18, cursor: 'pointer', transition: 'all .4s ease',
            }}
          >
            ☰
          </Box>
        )}
      </Box>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <Box sx={{
          position: 'fixed', inset: 0, zIndex: 45,
          background: 'rgba(14,11,7,.96)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px',
        }}>
          {NAV_LINKS.map((l) => (
            <Box
              key={l.label}
              component="a"
              href={l.href}
              onClick={() => setMenuOpen(false)}
              sx={{
                fontFamily: '"Cinzel", serif', letterSpacing: '.18em', textTransform: 'uppercase',
                textDecoration: 'none', color: '#f3e9cf', fontSize: 18,
                '&:hover': { color: '#d8b65a' },
              }}
            >
              {l.label}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
