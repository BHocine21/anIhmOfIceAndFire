import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppHeader } from 'components/AppHeader/AppHeader';
import BookDetails from 'components/BookDetails/BookDetails';
import MainContainer from 'components/MainContainer/MainContainer';
import { useApp } from 'hooks/useApp';
import { theme } from 'theme/theme';

const keyframes = `
  @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
  @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes cueDrop { 0%{transform:translateY(0);opacity:.2} 50%{opacity:1} 100%{transform:translateY(10px);opacity:.2} }
  @keyframes ringSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ringSpinR { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(216,182,90,.45)} 50%{box-shadow:0 0 0 22px rgba(216,182,90,0)} }
  @keyframes revealUp { from{opacity:0;transform:translateY(46px)} to{opacity:1;transform:none} }
  @keyframes panelIn { from{opacity:0;transform:translateY(40px) scale(.985)} to{opacity:1;transform:none} }
  @keyframes dragonDrift { 0%{transform:translate(0,0) rotate(2deg)} 50%{transform:translate(40px,-26px) rotate(-3deg)} 100%{transform:translate(0,0) rotate(2deg)} }
  @keyframes pinPulse { 0%,100%{transform:scale(1);opacity:.85} 50%{transform:scale(1.5);opacity:.15} }
  @keyframes overlayIn { from{opacity:0} to{opacity:1} }
`;

const App = () => {
  useApp();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={keyframes} />
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
