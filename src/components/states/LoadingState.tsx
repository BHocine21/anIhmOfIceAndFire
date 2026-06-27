import { Skeleton, Stack } from '@mui/material';

export interface LoadingStateProps {
  rows?: number;
}

export const LoadingState = ({ rows = 5 }: LoadingStateProps) => (
  <Stack
    spacing={1.5}
    sx={{ width: '100%', maxWidth: 560, mx: 'auto', mt: 5 }}
    role="status"
    aria-busy="true"
    aria-live="polite"
  >
    {Array.from({ length: rows }, (_, index) => (
      <Skeleton key={index} variant="rounded" height={64} />
    ))}
  </Stack>
);
