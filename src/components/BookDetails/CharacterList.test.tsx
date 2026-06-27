import { render, screen } from '@testing-library/react';

import { CharacterList } from 'components/BookDetails/CharacterList';

describe('CharacterList', () => {
  it('renders one entry per character', () => {
    render(<CharacterList characters={['Eddard Stark', 'Catelyn Stark']} />);

    const list = screen.getByRole('list', { name: /characters/i });
    expect(list.querySelectorAll('li')).toHaveLength(2);
    expect(screen.getByText('Eddard Stark')).toBeInTheDocument();
    expect(screen.getByText('Catelyn Stark')).toBeInTheDocument();
  });
});
