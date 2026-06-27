import axios from 'axios';

import type { RawCharacter } from 'types/types';

export const getCharacter = async (url: string): Promise<RawCharacter> => {
  const { data } = await axios.get<RawCharacter>(url);

  return data;
};
