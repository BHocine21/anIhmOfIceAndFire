import { useState } from 'react';
import { Box, Typography } from '@mui/material';

interface Character {
  id: string;
  name: string;
  role: string;
  house: string;
  color: string;
  body: string;
  quote: string;
  portrait: string;
}

const CHARACTERS: Character[] = [
  { id: 'ned', name: 'Eddard Stark', role: 'Warden of the North', house: 'House Stark', color: '#9aa6b2',
    portrait: 'https://thronesapi.com/assets/images/ned-stark.jpg',
    body: "Lord of Winterfell and Hand of the King, Ned is a man of unbending honour in a city that rewards none. His search for the truth of a king's death sets the realm aflame.",
    quote: 'The man who passes the sentence should swing the sword.' },
  { id: 'dany', name: 'Daenerys Targaryen', role: 'Mother of Dragons', house: 'House Targaryen', color: '#d98a82',
    portrait: 'https://thronesapi.com/assets/images/daenerys.jpg',
    body: 'Last surviving heir of a fallen dynasty, sold into marriage and reborn in fire. From the ashes she walks unburnt, three dragons at her heel, a continent before her.',
    quote: 'I will take what is mine with fire and blood.' },
  { id: 'jon', name: 'Jon Snow', role: 'Lord Commander', house: "Night's Watch", color: '#9aa6b2',
    portrait: 'https://thronesapi.com/assets/images/jon-snow.jpg',
    body: "The bastard of Winterfell who takes the black and rises to command the Watch. He is the watcher on the walls, the sword in the darkness against a foe few believe in.",
    quote: 'I am the watcher on the walls.' },
  { id: 'tyrion', name: 'Tyrion Lannister', role: 'The Imp', house: 'House Lannister', color: '#d9a441',
    portrait: 'https://thronesapi.com/assets/images/tyrion-lannister.jpg',
    body: 'Dwarf son of the richest man in the realm, scorned by his blood and armed only with his wits. He drinks, and he knows things, and his tongue is sharper than any blade.',
    quote: 'I drink and I know things.' },
  { id: 'cersei', name: 'Cersei Lannister', role: 'Queen Regent', house: 'House Lannister', color: '#d9a441',
    portrait: 'https://thronesapi.com/assets/images/cersei.jpg',
    body: 'A lioness who would burn the realm before she would kneel. Beautiful, ruthless, and convinced the throne is hers to wield through her children.',
    quote: 'When you play the game of thrones, you win or you die.' },
  { id: 'arya', name: 'Arya Stark', role: 'No One', house: 'House Stark', color: '#9aa6b2',
    portrait: 'https://thronesapi.com/assets/images/arya-stark.jpg',
    body: 'The wolf-blooded younger daughter of Winterfell, who would rather hold a sword than a needle. Loss makes her hard, and a list of names keeps her alive.',
    quote: 'A girl has no name.' },
  { id: 'jaime', name: 'Jaime Lannister', role: 'The Kingslayer', house: 'House Lannister', color: '#d9a441',
    portrait: 'https://thronesapi.com/assets/images/jaime-lannister.jpg',
    body: 'Golden knight of the Kingsguard, scorned for the king he slew. Beneath the arrogance lies a man wrestling with the vows that made and unmade him.',
    quote: 'So many vows… they make you swear and swear.' },
  { id: 'brienne', name: 'Brienne of Tarth', role: 'The Maid of Tarth', house: 'House Tarth', color: '#7fa8c9',
    portrait: 'https://thronesapi.com/assets/images/brienne-tarth.jpeg',
    body: 'A warrior maid of uncommon size and uncommoner honour, mocked by knights and truer than any of them. She keeps her oaths though the world gives her every reason not to.',
    quote: 'All my life men have told me what I could not do.' },
];

const initials = (name: string) => {
  const words = name.split(' ').filter((w) => w.length > 2);
  return words.slice(0, 2).map((w) => w[0]).join('');
};

const fallbackSvg = (c: Character) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 533'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232f2819'/><stop offset='1' stop-color='%23100c07'/></linearGradient></defs><rect width='400' height='533' fill='url(%23g)'/><circle cx='200' cy='205' r='96' fill='none' stroke='${encodeURIComponent(c.color)}' stroke-width='2' opacity='.55'/><circle cx='200' cy='205' r='112' fill='none' stroke='%23d8b65a' stroke-width='1' opacity='.4'/><text x='200' y='248' fill='%23f0e3c2' font-family='Georgia,serif' font-size='108' text-anchor='middle' opacity='.92'>${initials(c.name)}</text></svg>`,
  )}`;

export const CharactersSection = () => {
  const [active, setActive] = useState<Character | null>(null);

  return (
    <>
      <Box
        id="characters"
        component="section"
        sx={{
          position: 'relative', zIndex: 2,
          maxWidth: 1280, mx: 'auto',
          px: 'clamp(20px,5vw,40px)', pt: '120px', pb: 5,
          scrollMarginTop: 90,
        }}
      >
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: 7.5 }}>
          <Typography sx={{ fontFamily: '"Cinzel", serif', letterSpacing: '.4em', fontSize: 12, color: '#8a6d2c', textTransform: 'uppercase' }}>
            The Players
          </Typography>
          <Typography variant="h2" sx={{ fontSize: 'clamp(34px,5vw,62px)', mt: 1.5, color: '#241c12' }}>
            Key Characters
          </Typography>
          <Typography sx={{ maxWidth: 560, mx: 'auto', mt: 2, fontSize: 18, lineHeight: 1.65, color: '#5a4d3a' }}>
            Lords and bastards, queens and kingslayers — the hands that move the realm.
          </Typography>
        </Box>

        {/* Characters grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          {CHARACTERS.map((c) => (
            <Box
              key={c.id}
              onClick={() => setActive(c)}
              sx={{
                cursor: 'pointer', position: 'relative', borderRadius: '6px',
                overflow: 'hidden', aspectRatio: '3/4',
                boxShadow: '0 16px 36px -22px rgba(0,0,0,.7)',
                background: '#241d13',
                transition: 'transform .4s ease, box-shadow .4s ease',
                '&:hover': { transform: 'scale(1.02)', boxShadow: '0 30px 60px -28px rgba(0,0,0,.9)' },
              }}
            >
              {/* Portrait */}
              <Box
                component="img"
                src={c.portrait}
                alt={c.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = fallbackSvg(c);
                }}
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Gradient overlay */}
              <Box sx={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(20,16,9,0) 38%, rgba(20,16,9,.55) 64%, rgba(20,16,9,.94) 100%)',
              }} />

              {/* Text */}
              <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: '20px' }}>
                <Box sx={{
                  display: 'inline-block',
                  fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '.16em',
                  textTransform: 'uppercase', color: c.color,
                  border: `1px solid ${c.color}66`, px: '9px', py: '4px', borderRadius: '999px',
                }}>
                  {c.house}
                </Box>
                <Typography variant="h3" sx={{ fontSize: 20, mt: 1, mb: 0.5, color: '#f6ecd2', lineHeight: 1.1 }}>
                  {c.name}
                </Typography>
                <Typography sx={{ fontSize: 13, color: '#d8c9a3', fontStyle: 'italic' }}>
                  {c.role}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Detail overlay */}
      {active && (
        <Box
          onClick={() => setActive(null)}
          sx={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(14,11,7,.74)', backdropFilter: 'blur(6px)',
            animation: 'overlayIn .35s ease',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            overflowY: 'auto', p: '40px 20px',
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: 'relative', width: '100%', maxWidth: 920, m: 'auto',
              background: 'linear-gradient(180deg,#f4ecd6,#e9dcbd)',
              border: '1px solid rgba(216,182,90,.5)', borderRadius: '8px',
              boxShadow: '0 50px 100px -30px #000',
              animation: 'panelIn .5s cubic-bezier(.16,.8,.3,1)',
              overflow: 'hidden',
            }}
          >
            {/* Close */}
            <Box
              component="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              sx={{
                position: 'absolute', top: 16, right: 16, zIndex: 3,
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid rgba(43,34,24,.3)',
                background: 'rgba(244,236,214,.85)',
                color: '#2b2218', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ×
            </Box>

            {/* Two-column layout */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '300px 1fr' }, gap: 0 }}>
              {/* Portrait */}
              <Box sx={{ position: 'relative', minHeight: 380, background: '#241d13' }}>
                <Box
                  component="img"
                  src={active.portrait}
                  alt={active.name}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = fallbackSvg(active);
                  }}
                  sx={{ width: '100%', height: '100%', minHeight: 380, display: 'block', objectFit: 'cover', objectPosition: 'top' }}
                />
                <Box sx={{
                  position: 'absolute', inset: 0,
                  background: { sm: 'linear-gradient(105deg, rgba(20,16,9,0) 60%, rgba(244,236,214,.95) 100%)', xs: 'none' },
                }} />
              </Box>

              {/* Info */}
              <Box sx={{ p: '46px 46px 50px' }}>
                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: 12, letterSpacing: '.3em', textTransform: 'uppercase', color: '#6b1f24' }}>
                  {active.house}
                </Typography>
                <Typography variant="h2" sx={{ fontSize: 'clamp(28px,4vw,44px)', mt: 1.5, mb: 0.75, color: '#241c12', lineHeight: 1.05 }}>
                  {active.name}
                </Typography>
                <Typography sx={{ fontFamily: '"Cinzel Decorative", serif', fontStyle: 'italic', fontSize: 17, color: '#8a6d2c' }}>
                  {active.role}
                </Typography>

                <Box sx={{ width: 54, height: 2, background: '#b08d3f', my: 3 }} />

                <Typography sx={{ fontSize: 17, lineHeight: 1.7, color: '#463a29' }}>
                  {active.body}
                </Typography>

                <Box component="blockquote" sx={{
                  m: '26px 0 0', p: '16px 22px',
                  borderLeft: '3px solid #6b1f24',
                  background: 'rgba(107,31,36,.06)',
                  fontFamily: '"Cinzel Decorative", serif',
                  fontStyle: 'italic', fontSize: 17, color: '#6b1f24',
                }}>
                  &ldquo;{active.quote}&rdquo;
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
