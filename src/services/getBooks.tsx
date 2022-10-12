import axios from 'axios';

const getBooks = async () => {
  const { data } = await axios.get('https://anapioficeandfire.com/api/books');

  return data;
}

export default getBooks;
