import axios from 'axios';

const getCharacter = async (url: string) => {
  const { data } = await axios.get(url)

  return data;
}

export default getCharacter;
