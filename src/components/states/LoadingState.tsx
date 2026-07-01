import { Box, Skeleton } from '@mui/material';

export interface LoadingStateProps {
  rows?: number;
}

export const LoadingState = ({ rows = 5 }: LoadingStateProps) => (
  <Box
    sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '30px' }}
    role="status"
    aria-busy="true"
    aria-live="polite"
  >
    {Array.from({ length: rows }, (_, index) => (
      <Skeleton
        key={index}
        variant="rounded"
        sx={{ aspectRatio: '2/3', height: 'auto', bgcolor: 'rgba(43,34,24,.1)' }}
      />
    ))}
  </Box>
);
