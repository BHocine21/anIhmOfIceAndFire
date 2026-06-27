import { render, screen } from '@testing-library/react';

import { ErrorState } from 'components/states/ErrorState';

describe('ErrorState', () => {
  it('renders default title and message', () => {
    render(<ErrorState />);

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
    expect(screen.getByRole('alert')).toHaveTextContent('Please try again later.');
  });

  it('renders a custom title and message', () => {
    render(<ErrorState title="Custom title" message="Custom message" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Custom title');
    expect(screen.getByRole('alert')).toHaveTextContent('Custom message');
  });
});
