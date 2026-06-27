import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c8a45c' },
    secondary: { main: '#7a1f1f' },
    background: { default: '#0b0b0d', paper: '#15151a' },
  },
  typography: {
    fontFamily: '"Cinzel", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Cinzel", serif' },
    h2: { fontFamily: '"Cinzel", serif' },
  },
  shape: { borderRadius: 8 },
});
