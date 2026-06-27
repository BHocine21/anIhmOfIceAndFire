import { List, ListItem, ListItemText } from '@mui/material';

export interface CharacterListProps {
  characters: string[];
}

export const CharacterList = ({ characters }: CharacterListProps) => (
  <List dense sx={{ maxHeight: '20rem', overflowY: 'auto' }} aria-label="Characters">
    {characters.map((character) => (
      <ListItem key={character} disableGutters>
        <ListItemText primary={character} />
      </ListItem>
    ))}
  </List>
);
