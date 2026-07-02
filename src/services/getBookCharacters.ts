import axios from 'axios';

import type { RawCharacter } from 'types/types';

export const getBookCharacters = async (bookId: number): Promise<string[]> => {
  const { data } = await axios.get<RawCharacter[]>(
    `https://anapioficeandfire.com/api/characters?book=${bookId}&pageSize=50`,
  );
  return data.map((c) => c.name).filter(Boolean).sort();
};
