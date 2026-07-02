import { Box, Typography } from '@mui/material';

interface House {
  id: string;
  name: string;
  words: string;
  seat: string;
  region: string;
  color: string;
  desc: string;
  crest: string;
  fallbackInitial: string;
}

const HOUSES: House[] = [
  { id: 'stark', name: 'House Stark', words: 'Winter Is Coming', seat: 'Winterfell', region: 'The North', color: '#7f8b97',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Stark_CoA.png/250px-Stark_CoA.png',
    fallbackInitial: 'S',
    desc: 'Grey direwolves of the North, bound by honour and the cold. Their roots run as deep as the crypts beneath Winterfell.' },
  { id: 'lannister', name: 'House Lannister', words: 'Hear Me Roar', seat: 'Casterly Rock', region: 'The Westerlands', color: '#b01f2e',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Coat_of_arms_of_House_Lannister_of_Casterly_Rock.svg/250px-Coat_of_arms_of_House_Lannister_of_Casterly_Rock.svg.png',
    fallbackInitial: 'L',
    desc: 'Golden lions of the west, richest house in the realm. A Lannister, they say, always pays his debts.' },
  { id: 'targaryen', name: 'House Targaryen', words: 'Fire and Blood', seat: 'Dragonstone', region: 'Crownlands', color: '#c0392b',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/House_Targaryen.png/250px-House_Targaryen.png',
    fallbackInitial: 'T',
    desc: 'Blood of old Valyria, riders of dragons. Madness and greatness are two sides of the same coin in their line.' },
  { id: 'baratheon', name: 'House Baratheon', words: 'Ours Is the Fury', seat: "Storm's End", region: 'The Stormlands', color: '#d4a017',
    crest: "https://upload.wikimedia.org/wikipedia/commons/4/43/Coat_of_arms_of_House_Baratheon_of_Storm%27s_End.svg",
    fallbackInitial: 'B',
    desc: 'Crowned stags of the storm-lashed coast, born of rebellion. Theirs is a strength of war and wrath.' },
  { id: 'greyjoy', name: 'House Greyjoy', words: 'We Do Not Sow', seat: 'Pyke', region: 'Iron Islands', color: '#3c7d7d',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Coat_of_arms_of_House_Greyjoy_of_Pyke.svg',
    fallbackInitial: 'G',
    desc: 'Krakens of the salt sea, reavers who take rather than reap. What is dead may never die.' },
  { id: 'martell', name: 'House Martell', words: 'Unbowed, Unbent, Unbroken', seat: 'Sunspear', region: 'Dorne', color: '#d4691e',
    crest: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Coat_of_arms_of_House_Nymeros_Martell_of_Sunspear.svg',
    fallbackInitial: 'M',
    desc: 'Sun and spear of the southern sands, unconquered and unforgiving. Dorne remembers every debt of blood.' },
];

const fallbackSvg = (h: House) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><defs><radialGradient id='r' cx='.5' cy='.42' r='.62'><stop offset='0' stop-color='${h.color}'/><stop offset='.5' stop-color='${h.color}'/><stop offset='1' stop-color='#100c07'/></radialGradient></defs><rect width='400' height='400' fill='#100c07'/><circle cx='200' cy='200' r='160' fill='url(%23r)' opacity='.92'/><circle cx='200' cy='200' r='160' fill='none' stroke='%23d8b65a' stroke-width='3'/><circle cx='200' cy='200' r='140' fill='none' stroke='%23f0e3c2' stroke-width='1' opacity='.45'/><text x='200' y='260' fill='%23f6ecd2' font-family='Georgia,serif' font-size='180' font-weight='bold' text-anchor='middle'>${h.fallbackInitial}</text></svg>`,
  )}`;

export const HousesSection = () => (
  <Box
    id="houses"
    component="section"
    sx={{
      position: 'relative', zIndex: 2,
      mt: 10, py: '300px',
      background: 'linear-gradient(180deg, rgba(26,22,15,0) 0%, #1c1810 14%, #15110b 86%, rgba(26,22,15,0) 100%)',
      scrollMarginTop: 90,
    }}
  >
    <Box sx={{ maxWidth: 1240, mx: 'auto', px: 'clamp(20px,5vw,40px)' }}>
      {/* Section header */}
      <Box sx={{ textAlign: 'center', mb: 7.5 }}>
        <Typography sx={{ fontFamily: '"Cinzel", serif', letterSpacing: '.4em', fontSize: 12, color: '#caa24a', textTransform: 'uppercase' }}>
          Words &amp; Banners
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 'clamp(34px,5vw,62px)', mt: 1.5, color: '#f3e9cf' }}>
          The Great Houses
        </Typography>
        <Typography sx={{ maxWidth: 560, mx: 'auto', mt: 2, fontSize: 18, lineHeight: 1.65, color: '#cdbd9a' }}>
          Every banner a bloodline; every word a warning. These are the powers that war for the realm.
        </Typography>
      </Box>

      {/* Houses grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '26px' }}>
        {HOUSES.map((h) => (
          <Box
            key={h.id}
            sx={{
              position: 'relative',
              background: 'linear-gradient(180deg,#241d13,#1a150d)',
              border: '1px solid rgba(216,182,90,.18)',
              borderRadius: '6px', overflow: 'hidden',
              transition: 'translate .45s ease, box-shadow .45s ease',
              '&:hover': { translate: '0 -8px', boxShadow: '0 30px 60px -28px #000' },
            }}
          >
            {/* Color bar */}
            <Box sx={{ height: 5, width: '100%', background: h.color }} />

            <Box sx={{ p: '34px 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* Sigil with ring */}
              <Box sx={{ position: 'relative', width: 128, height: 128, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  boxShadow: `0 0 0 2px ${h.color}, 0 0 34px -6px ${h.color}`,
                  background: `radial-gradient(circle, ${h.color}22, transparent 70%)`,
                }} />
                <Box sx={{ position: 'absolute', inset: 14, borderRadius: '50%', overflow: 'hidden', background: '#0a0805' }}>
                  <Box
                    component="img"
                    src={h.crest}
                    alt={`${h.name} sigil`}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = fallbackSvg(h);
                    }}
                    sx={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', p: '6px' }}
                  />
                </Box>
              </Box>

              {/* Name */}
              <Typography variant="h3" sx={{ fontSize: 22, mt: 2.5, mb: 0, color: '#f3e9cf' }}>
                {h.name}
              </Typography>

              {/* Motto */}
              <Typography sx={{ fontFamily: '"Cinzel Decorative", serif', fontStyle: 'italic', fontSize: 15, mt: 1, color: '#d8b65a' }}>
                &ldquo;{h.words}&rdquo;
              </Typography>

              {/* Divider */}
              <Box sx={{ width: 40, height: 1, background: 'rgba(216,182,90,.4)', my: 2 }} />

              {/* Description */}
              <Typography sx={{ fontSize: 14.5, lineHeight: 1.55, color: '#bfae8a', m: 0 }}>
                {h.desc}
              </Typography>

              {/* Tags */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
                {[`Seat · ${h.seat}`, h.region].map((tag) => (
                  <Box key={tag} sx={{
                    fontFamily: '"Cinzel", serif', fontSize: 10.5, letterSpacing: '.12em',
                    textTransform: 'uppercase', color: '#9a8458',
                    border: '1px solid rgba(216,182,90,.25)', px: '11px', py: '5px', borderRadius: '999px',
                  }}>
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);
