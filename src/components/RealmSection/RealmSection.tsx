import { Box, Typography } from '@mui/material';

interface RealmPin {
  name: string;
  x: number;
  y: number;
  /** côté du label par rapport au point */
  side?: 'left' | 'right';
}

// Carte de Westeros (Seven Kingdoms) — Wikimedia Commons, licence libre
const MAP_URL = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Seven_Kingdoms.svg';

// Positions en % calibrées sur la carte ci-dessus (ratio ~520x800)
const PINS: RealmPin[] = [
  { name: 'The Wall', x: 45, y: 18 },
  { name: 'Winterfell', x: 41, y: 34 },
  { name: 'Pyke', x: 23, y: 50, side: 'left' },
  { name: 'The Eyrie', x: 58, y: 54 },
  { name: 'Casterly Rock', x: 22, y: 60, side: 'left' },
  { name: "King's Landing", x: 55, y: 64 },
  { name: 'Highgarden', x: 34, y: 73, side: 'left' },
  { name: "Storm's End", x: 58, y: 74 },
  { name: 'Sunspear', x: 55, y: 86 },
];

export const RealmSection = () => (
  <Box
    id="realm"
    component="section"
    sx={{
      position: 'relative', zIndex: 2,
      mt: '90px', py: '300px',
      background: 'linear-gradient(180deg, rgba(26,22,15,0), #18130c 16%, #14100a 84%, rgba(26,22,15,0))',
      scrollMarginTop: 90,
    }}
  >
    <Box sx={{ maxWidth: 1240, mx: 'auto', px: 'clamp(20px,5vw,40px)' }}>
      {/* Section header */}
      <Box sx={{ textAlign: 'center', mb: 7 }}>
        <Typography sx={{ fontFamily: '"Cinzel", serif', letterSpacing: '.4em', fontSize: 12, color: '#caa24a', textTransform: 'uppercase' }}>
          Cartography
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 'clamp(34px,5vw,62px)', mt: 1.5, color: '#f3e9cf' }}>
          The Realm of Westeros
        </Typography>
        <Typography sx={{ maxWidth: 560, mx: 'auto', mt: 2, fontSize: 18, lineHeight: 1.65, color: '#cdbd9a' }}>
          From the icy Wall in the North to the sun-scorched sands of Dorne — the seats of power
          across the Seven Kingdoms.
        </Typography>
      </Box>

      {/* Map container — portrait, centré */}
      <Box sx={{
        position: 'relative',
        width: '100%', maxWidth: 540, mx: 'auto',
        aspectRatio: '520 / 800',
        border: '1px solid rgba(216,182,90,.3)', borderRadius: '10px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 40%, #1c2733, #0d1219)',
        boxShadow: '0 40px 90px -40px #000, inset 0 0 0 1px rgba(216,182,90,.1)',
      }}>
        <Box
          component="img"
          src={MAP_URL}
          alt="Map of Westeros"
          sx={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
        />

        {/* Vignette */}
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          boxShadow: 'inset 0 0 90px 20px rgba(13,18,25,.6)',
          borderRadius: '10px',
        }} />

        {/* Location pins */}
        {PINS.map((pin) => (
          <Box
            key={pin.name}
            title={pin.name}
            sx={{
              position: 'absolute',
              left: `${pin.x}%`, top: `${pin.y}%`,
              width: 12, height: 12,
              transform: 'translate(-50%,-50%)',
              zIndex: 2,
            }}
          >
            {/* Pulse ring */}
            <Box sx={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: '#d8b65a',
              animation: 'pinPulse 2.4s ease-out infinite',
            }} />
            {/* Pin dot */}
            <Box sx={{
              position: 'relative', display: 'block', width: 12, height: 12,
              borderRadius: '50%', background: '#6b1f24',
              border: '2px solid #f0e3c2', boxShadow: '0 2px 6px rgba(0,0,0,.8)',
            }} />
            {/* Label */}
            <Box sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              ...(pin.side === 'left'
                ? { right: 18, textAlign: 'right' }
                : { left: 18, textAlign: 'left' }),
              whiteSpace: 'nowrap',
              fontFamily: '"Cinzel", serif', fontSize: 11, fontWeight: 600, letterSpacing: '.06em',
              color: '#f6ecd2', textShadow: '0 1px 3px #000, 0 0 6px #000',
              background: 'rgba(13,10,6,.7)', px: '7px', py: '3px', borderRadius: '4px',
              border: '1px solid rgba(216,182,90,.25)',
            }}>
              {pin.name}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);
