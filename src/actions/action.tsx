import dateFormat from 'dateformat';
import { Dispatch } from 'redux';

import getBooks from 'services/getBooks';

import { ActionType, Action, Book } from 'types/types';

/**
 * Get all books from AJAX request and update store with the result.
 */
export const fetchBooks = () => async (dispatch: Dispatch<Action>) => {
  try {
    getBooks().then((books)=>{
      const parsedData: Book[] = books.map((book: Book, index: number) => {
        // Get date object in order to formate it to dd/mm/yyyy.
        const releasedDate = new Date(book.released);

        // Get only used properties.
        return ({
          id: index+1,
          name: book.name,
          authors: book.authors.join(', '),
          numberOfPages: book.numberOfPages,
          publisher: book.publisher,
          country: book.country,
          released: dateFormat(releasedDate, 'dd/mm/yyyy'),
          characters: book.characters,
        })
      })
      dispatch({
          type: ActionType.FETCH_BOOKS,
          payload: parsedData
      });
    });

  }
  catch(err) {
    console.log(err);
  }
};

