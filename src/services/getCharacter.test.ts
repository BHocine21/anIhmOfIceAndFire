import axios from 'axios';

import { getCharacter } from 'services/getCharacter';
import type { RawCharacter } from 'types/types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getCharacter', () => {
  it('fetches a character from the given url and returns the response data', async () => {
    const rawCharacter: RawCharacter = {
      url: 'https://anapioficeandfire.com/api/characters/1',
      name: 'Eddard Stark',
    };

    mockedAxios.get.mockResolvedValueOnce({ data: rawCharacter });

    const result = await getCharacter(rawCharacter.url);

    expect(mockedAxios.get).toHaveBeenCalledWith(rawCharacter.url);
    expect(result).toEqual(rawCharacter);
  });
});
