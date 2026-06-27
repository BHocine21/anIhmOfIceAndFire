import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import gotHeader from 'assets/gotHeader.png';

export const AppHeader = () => (
  <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
    <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
      <Link to="/" aria-label="Back to home">
        <img
          src={gotHeader}
          alt="A Song of Ice and Fire"
          height={56}
          style={{ filter: 'invert(1)' }}
        />
      </Link>
    </Toolbar>
  </AppBar>
);
