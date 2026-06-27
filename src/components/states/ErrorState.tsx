import { Alert, AlertTitle, Box } from '@mui/material';

export interface ErrorStateProps {
  title?: string;
  message?: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again later.',
}: ErrorStateProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, px: 2 }}>
    <Alert severity="error" role="alert" sx={{ width: '100%', maxWidth: 560 }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  </Box>
);
