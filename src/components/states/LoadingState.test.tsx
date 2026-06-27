import { render, screen } from '@testing-library/react';

import { LoadingState } from 'components/states/LoadingState';

describe('LoadingState', () => {
  it('renders a busy live region with the default number of skeleton rows', () => {
    render(<LoadingState />);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(status.children).toHaveLength(5);
  });

  it('renders the requested number of skeleton rows', () => {
    render(<LoadingState rows={3} />);

    expect(screen.getByRole('status').children).toHaveLength(3);
  });
});
