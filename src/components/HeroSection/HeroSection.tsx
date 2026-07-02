import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

import gotHeader from 'assets/gotHeader.png';

// ➜ Colle ici l'ID YouTube de n'importe quelle vidéo GoT (ex: ?v=s7L2PVdrb_8)
const GOT_VIDEO_ID = 's7L2PVdrb_8';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const HeroSection = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const revealTimer = useRef<number | undefined>(undefined);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const createPlayer = () => {
      if (!playerRef.current) return;
      new window.YT.Player(playerRef.current, {
        videoId: GOT_VIDEO_ID,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: GOT_VIDEO_ID,
          controls: 0,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          cc_load_policy: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            // États YT : -1 non démarré, 0 fini, 1 lecture, 2 pause, 3 buffering
            if (e.data === 1) {
              // La vidéo joue. YouTube affiche brièvement ses boutons centraux
              // au démarrage : on attend qu'ils s'estompent (~2.5s) AVANT de
              // lever l'overlay sombre, pour ne jamais les montrer.
              if (!revealTimer.current) {
                revealTimer.current = window.setTimeout(() => setVideoReady(true), 2600);
              }
            } else if (e.data === 0) {
              e.target.playVideo(); // loop manuel à la fin
            } else if (e.data === 2) {
              e.target.playVideo(); // relance si mis en pause (ex: focus)
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      if (revealTimer.current) clearTimeout(revealTimer.current);
    };
  }, []);

  return (
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
        background: '#0a0806',
      }}
    >
      {/* ── Lecteur YouTube en fond ── */}
      {/*
        Technique full-bleed : le wrapper est sur-dimensionné à 130% du viewport
        (ratio 16:9 gardé via vw/vh) et centré. Le débordement crope la barre de
        contrôles YouTube (en bas) et le titre (en haut) hors du champ visible.
        overflow:hidden sur le clip parent masque tout ce qui dépasse.
      */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            /* 16:9 basé sur la largeur, avec un minimum 16:9 basé sur la hauteur */
            width: '130vw',
            height: '73.125vw', // 130vw * 9/16
            minWidth: '231.11vh', // 130vh * 16/9
            minHeight: '130vh',
          }}
        >
          <Box ref={playerRef} sx={{ width: '100%', height: '100%', '& iframe': { display: 'block', border: 'none' } }} />
        </Box>
      </Box>

      {/* Écran noir opaque pendant le chargement — disparaît quand la vidéo démarre */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: '#0a0806',
        opacity: videoReady ? 0 : 1,
        transition: 'opacity 1.2s ease',
        pointerEvents: 'none',
      }} />

      {/* Overlays cinématiques permanents */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(180deg, rgba(6,4,2,.72) 0%, rgba(10,7,4,.4) 35%, rgba(18,13,7,.18) 58%, rgba(231,217,184,.88) 100%)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(70% 60% at 50% 40%, transparent 30%, rgba(4,3,1,.5) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Contenu ── */}
      <Box sx={{ position: 'relative', zIndex: 3, textAlign: 'center', px: 3, maxWidth: 1000 }}>
        <Box component="img"
          src={gotHeader}
          alt="Game of Thrones"
          sx={{ width: 'min(78vw, 320px)', height: 'auto', display: 'block', mx: 'auto', mb: 3, filter: 'invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.05)' }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ height: 1, width: 64, background: 'linear-gradient(90deg,transparent,#d8b65a)' }} />
          <Typography sx={{ fontFamily: '"Cinzel", serif', letterSpacing: '.42em', fontSize: 12, color: '#e8cf8e', textTransform: 'uppercase' }}>
            A Chronicle of Westeros
          </Typography>
          <Box sx={{ height: 1, width: 64, background: 'linear-gradient(90deg,#d8b65a,transparent)' }} />
        </Box>

        <Typography component="h1" sx={{
          fontFamily: '"Cinzel", serif', fontWeight: 900,
          fontSize: 'clamp(44px, 8vw, 118px)', lineHeight: .96,
          color: '#f6ecd2', textShadow: '0 4px 40px rgba(0,0,0,.8)',
          letterSpacing: '.02em', m: 0,
        }}>
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

        <Typography sx={{
          fontFamily: '"EB Garamond", serif',
          fontSize: 'clamp(17px, 2vw, 22px)',
          maxWidth: 620, mx: 'auto', mt: 3.5, mb: 5,
          color: '#efe2c4', lineHeight: 1.6,
          textShadow: '0 2px 16px rgba(0,0,0,.7)',
        }}>
          Five novels. Seven kingdoms. A thousand swords between a boy and the Iron Throne —
          and a winter with no end at the edge of the world.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Box component="a" href="#saga" sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 600, letterSpacing: '.14em',
            textTransform: 'uppercase', fontSize: 13, textDecoration: 'none',
            color: '#1a140a', background: 'linear-gradient(180deg,#e7cf86,#c4a04a)',
            px: '34px', py: '16px', borderRadius: '2px',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,.6)',
            transition: 'filter .3s ease', '&:hover': { filter: 'brightness(1.1)' },
          }}>
            Enter the Saga
          </Box>
          <Box component="a" href="#houses" sx={{
            fontFamily: '"Cinzel", serif', fontWeight: 600, letterSpacing: '.14em',
            textTransform: 'uppercase', fontSize: 13, textDecoration: 'none',
            color: '#f3e9cf', border: '1px solid rgba(243,233,207,.5)',
            px: '34px', py: '16px', borderRadius: '2px',
            backdropFilter: 'blur(4px)', background: 'rgba(20,16,9,.2)',
            transition: 'all .3s ease', '&:hover': { borderColor: 'rgba(243,233,207,.9)' },
          }}>
            The Great Houses
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
