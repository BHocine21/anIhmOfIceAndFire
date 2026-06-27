import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppHeader } from 'components/AppHeader/AppHeader';
import BookDetails from 'components/BookDetails/BookDetails';
import MainContainer from 'components/MainContainer/MainContainer';
import { useApp } from 'hooks/useApp';
import { theme } from 'theme/theme';

const App = () => {
  useApp();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
