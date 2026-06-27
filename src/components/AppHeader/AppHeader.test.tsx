import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AppHeader } from 'components/AppHeader/AppHeader';

describe('AppHeader', () => {
  it('renders a link back to home with the site logo', () => {
    render(
      <MemoryRouter>
        <AppHeader />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /back to home/i });
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByAltText('A Song of Ice and Fire')).toBeInTheDocument();
  });
});
