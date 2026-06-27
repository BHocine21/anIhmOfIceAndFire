import { Box, Typography } from '@mui/material';

export interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, px: 2 }}>
    <Typography variant="body1" color="text.secondary">
      {message}
    </Typography>
  </Box>
);
