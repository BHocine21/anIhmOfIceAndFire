import { Box, Typography } from '@mui/material';

import { BookList } from 'components/BookList/BookList';
import { CharactersSection } from 'components/CharactersSection/CharactersSection';
import { FooterSection } from 'components/FooterSection/FooterSection';
import { HeroSection } from 'components/HeroSection/HeroSection';
import { HousesSection } from 'components/HousesSection/HousesSection';
import { RealmSection } from 'components/RealmSection/RealmSection';
import { EmptyState } from 'components/states/EmptyState';
import { ErrorState } from 'components/states/ErrorState';
import { LoadingState } from 'components/states/LoadingState';
import { useMainContainer } from 'hooks/useMainContainer';

const SagaContent = () => {
  const { books, status, error } = useMainContainer();

  if (status === 'idle' || status === 'loading') return <LoadingState />;
  if (status === 'failed') return <ErrorState message={error ?? undefined} />;
  if (books.length === 0) return <EmptyState message="No books found." />;
  return <BookList books={books} />;
};

const MainContainer = () => (
  <>
    <HeroSection />

    {/* Saga / Books section */}
    <Box
      id="saga"
      component="section"
      sx={{
        position: 'relative', zIndex: 2,
        maxWidth: 1240, mx: 'auto',
        px: 'clamp(20px,5vw,40px)', pt: '120px', pb: 5,
        scrollMarginTop: 90,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography sx={{ fontFamily: '"Cinzel", serif', letterSpacing: '.4em', fontSize: 12, color: '#8a6d2c', textTransform: 'uppercase' }}>
          Volumes I – V
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 'clamp(34px,5vw,62px)', mt: 1.5, color: '#241c12' }}>
          The Saga
        </Typography>
        <Typography sx={{ maxWidth: 560, mx: 'auto', mt: 2, fontSize: 18, lineHeight: 1.65, color: '#5a4d3a' }}>
          Five published chronicles of the Iron Throne, with a sixth winter still gathering on the horizon.
        </Typography>
      </Box>

      <SagaContent />
    </Box>

    <HousesSection />
    <CharactersSection />
    <RealmSection />
    <FooterSection />
  </>
);

export default MainContainer;
