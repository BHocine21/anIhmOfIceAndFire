import { Box, Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { BookDetailsTable } from 'components/BookDetails/BookDetailsTable';
import { EmptyState } from 'components/states/EmptyState';
import { ErrorState } from 'components/states/ErrorState';
import { useBookDetails } from 'hooks/useBookDetails';

const BackLink = () => (
  <Box
    component={Link}
    to="/"
    sx={{
      display: 'inline-flex', alignItems: 'center', gap: 1,
      fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '.2em',
      textTransform: 'uppercase', textDecoration: 'none', color: '#6b1f24',
      '&:hover': { color: '#9a2f34' },
    }}
  >
    ← Back to Saga
  </Box>
);

const DetailSkeleton = () => (
  <Box
    role="status"
    aria-busy="true"
    aria-live="polite"
    sx={{
      maxWidth: 860, mx: 'auto', px: 'clamp(20px,5vw,40px)', pt: 3, pb: 8,
    }}
  >
    <Box sx={{
      border: '1px solid rgba(216,182,90,.3)', borderRadius: '8px', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '260px 1fr' },
    }}>
      {/* Left: cover skeleton */}
      <Skeleton variant="rectangular" sx={{ minHeight: 380, bgcolor: 'rgba(43,34,24,.12)' }} />

      {/* Right: info skeletons */}
      <Box sx={{ p: '40px 44px 44px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="text" width="50%" sx={{ bgcolor: 'rgba(43,34,24,.1)', fontSize: 12 }} />
        <Skeleton variant="text" width="80%" sx={{ bgcolor: 'rgba(43,34,24,.1)', fontSize: 40 }} />
        <Skeleton variant="rectangular" height={2} sx={{ bgcolor: 'rgba(216,182,90,.3)', my: 1 }} />
        {Array.from({ length: 5 }, (_, i) => (
          <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 2 }}>
            <Skeleton variant="text" sx={{ bgcolor: 'rgba(43,34,24,.1)' }} />
            <Skeleton variant="text" sx={{ bgcolor: 'rgba(43,34,24,.1)' }} />
          </Box>
        ))}
        <Skeleton variant="rectangular" height={1} sx={{ bgcolor: 'rgba(43,34,24,.1)', my: 1 }} />
        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8a6d2c' }}>
          Characters
        </Typography>
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} variant="text" width={`${60 + i * 10}%`} sx={{ bgcolor: 'rgba(43,34,24,.1)' }} />
        ))}
      </Box>
    </Box>
  </Box>
);

const BookDetails = () => {
  const { bookDetails, status } = useBookDetails();

  return (
    <Box sx={{ pt: 10 }}>
      <Box sx={{ maxWidth: 860, mx: 'auto', px: 'clamp(20px,5vw,40px)', pt: 4, pb: 2 }}>
        <BackLink />
      </Box>

      {status === 'idle' || status === 'loading' ? (
        <DetailSkeleton />
      ) : status === 'failed' ? (
        <Box sx={{ maxWidth: 860, mx: 'auto', px: 'clamp(20px,5vw,40px)', mt: 2 }}>
          <ErrorState message="Unable to load this book's details." />
        </Box>
      ) : status === 'not-found' || !bookDetails ? (
        <EmptyState message="This book could not be found." />
      ) : (
        <BookDetailsTable bookDetails={bookDetails} />
      )}
    </Box>
  );
};

export default BookDetails;
