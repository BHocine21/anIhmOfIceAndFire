import { Box, Typography } from '@mui/material';

export interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Box sx={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 40, color: '#9a7b3f', mb: 2 }}>✦</Box>
    <Typography sx={{ fontSize: 18, color: '#5a4d3a' }}>
      {message}
    </Typography>
  </Box>
);
