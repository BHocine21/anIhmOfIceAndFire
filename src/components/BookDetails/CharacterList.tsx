export interface CharacterListProps {
  characters: string[];
}

export const CharacterList = ({ characters }: CharacterListProps) => {
  if (characters.length === 0) {
    return (
      <p style={{ margin: 0, fontSize: 15, color: '#8a6d2c', fontStyle: 'italic' }}>
        No named characters found.
      </p>
    );
  }

  return (
    <ul
      aria-label="Characters"
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {characters.map((character) => (
        <li
          key={character}
          style={{
            padding: '5px 14px',
            border: '1px solid rgba(43,34,24,.18)',
            borderRadius: '999px',
            fontSize: 13,
            color: '#3a2f20',
            fontFamily: '"EB Garamond", Georgia, serif',
            background: 'rgba(43,34,24,.04)',
            lineHeight: 1.5,
          }}
        >
          {character}
        </li>
      ))}
    </ul>
  );
};
