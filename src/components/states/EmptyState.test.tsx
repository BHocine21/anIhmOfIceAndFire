import { render, screen } from '@testing-library/react';

import { EmptyState } from 'components/states/EmptyState';

describe('EmptyState', () => {
  it('renders the given message', () => {
    render(<EmptyState message="No books found." />);

    expect(screen.getByText('No books found.')).toBeInTheDocument();
  });
});
