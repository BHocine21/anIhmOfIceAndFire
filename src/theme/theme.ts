import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#caa24a', dark: '#b08d3f', light: '#e7cf86' },
    secondary: { main: '#6b1f24' },
    background: { default: '#e7d9b8', paper: '#f4ecd6' },
    text: { primary: '#2b2218', secondary: '#5a4d3a' },
  },
  typography: {
    fontFamily: '"EB Garamond", Georgia, serif',
    h1: { fontFamily: '"Cinzel", serif', fontWeight: 900 },
    h2: { fontFamily: '"Cinzel", serif', fontWeight: 800 },
    h3: { fontFamily: '"Cinzel", serif', fontWeight: 700 },
    h4: { fontFamily: '"Cinzel", serif', fontWeight: 700 },
    h5: { fontFamily: '"Cinzel", serif', fontWeight: 600 },
    h6: { fontFamily: '"Cinzel", serif', fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: {
          margin: 0,
          padding: 0,
          background: 'radial-gradient(120% 90% at 50% 0%, #efe4c6 0%, #e7d9b8 38%, #dccba1 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        '::selection': { background: '#6b1f24', color: '#f3e9cf' },
      },
    },
  },
});
