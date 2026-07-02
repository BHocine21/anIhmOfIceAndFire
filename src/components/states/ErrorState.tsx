import { Box, Typography } from '@mui/material';

export interface ErrorStateProps {
  title?: string;
  message?: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again later.',
}: ErrorStateProps) => (
  <Box
    role="alert"
    sx={{
      p: '24px 30px',
      background: 'rgba(107,31,36,.08)',
      border: '1px solid rgba(107,31,36,.3)',
      borderLeft: '3px solid #6b1f24',
      borderRadius: '4px',
    }}
  >
    <Typography sx={{ fontFamily: '"Cinzel", serif', fontWeight: 700, fontSize: 16, color: '#6b1f24', mb: 1 }}>
      {title}
    </Typography>
    <Typography sx={{ fontSize: 16, color: '#5a4d3a' }}>
      {message}
    </Typography>
  </Box>
);
