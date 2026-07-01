import { Box, Typography } from '@mui/material';

interface RealmPin {
  name: string;
  x: number;
  y: number;
}

const PINS: RealmPin[] = [
  { name: 'The Wall', x: 50, y: 7 },
  { name: 'Winterfell', x: 48, y: 22 },
  { name: 'Pyke', x: 30, y: 38 },
  { name: 'The Eyrie', x: 60, y: 42 },
  { name: 'Casterly Rock', x: 40, y: 52 },
  { name: "King's Landing", x: 57, y: 56 },
  { name: 'Highgarden', x: 45, y: 66 },
  { name: "Storm's End", x: 64, y: 67 },
  { name: 'Sunspear', x: 60, y: 84 },
];

const mapSvg = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000'><defs><linearGradient id='p' x1='0' y1='0' x2='.3' y2='1'><stop offset='0' stop-color='%23e9ddc1'/><stop offset='1' stop-color='%23ccb789'/></linearGradient></defs><rect width='1600' height='1000' fill='url(%23p)'/><rect x='28' y='28' width='1544' height='944' fill='none' stroke='%239a7b3f' stroke-width='2' opacity='.55'/><text x='800' y='115' fill='%237a5f30' font-family='Georgia,serif' font-size='54' letter-spacing='20' text-anchor='middle' opacity='.45'>WESTEROS</text><g stroke='%239a7b3f' stroke-width='1.5' fill='none' opacity='.45'><circle cx='1390' cy='850' r='58'/><path d='M1390 778 L1390 922 M1318 850 L1462 850'/></g><path d='M1390 782 L1404 838 L1390 822 L1376 838 Z' fill='%239a7b3f' opacity='.55'/></svg>",
)}`;

export const RealmSection = () => (
  <Box
    id="realm"
    component="section"
    sx={{
      position: 'relative', zIndex: 2,
      mt: '90px', py: '110px',
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

      {/* Map container */}
      <Box sx={{
        position: 'relative',
        border: '1px solid rgba(216,182,90,.25)', borderRadius: '8px',
        overflow: 'hidden', aspectRatio: '16/10',
        boxShadow: '0 40px 80px -40px #000',
      }}>
        <Box
          component="img"
          src={mapSvg}
          alt="Map of Westeros"
          sx={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
        />

        {/* Inner shadow vignette */}
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          boxShadow: 'inset 0 0 120px 30px rgba(20,16,9,.55)',
        }} />

        {/* Location pins */}
        {PINS.map((pin) => (
          <Box
            key={pin.name}
            title={pin.name}
            sx={{
              position: 'absolute',
              left: `${pin.x}%`, top: `${pin.y}%`,
              width: 11, height: 11,
              transform: 'translate(-50%,-50%)',
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
              position: 'relative', display: 'block', width: 11, height: 11,
              borderRadius: '50%', background: '#6b1f24',
              border: '2px solid #f0e3c2', boxShadow: '0 2px 6px rgba(0,0,0,.6)',
            }} />
            {/* Label */}
            <Box sx={{
              position: 'absolute', left: 16, top: -4,
              whiteSpace: 'nowrap',
              fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '.08em',
              color: '#f3e9cf', textShadow: '0 1px 4px #000',
              background: 'rgba(20,16,9,.5)', px: 1, py: 0.5, borderRadius: '3px',
            }}>
              {pin.name}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);
