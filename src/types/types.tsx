export enum ActionType {
  FETCH_BOOKS = 'FETCH_BOOKS'
}

export interface Book {
  id: number,
  url: string,
  name: string,
  isbn: string,
  authors: string[],
  numberOfPages: number,
  publisher: string,
  country: string,
  mediaType: string,
  released: string,
  characters: string[],
}
export interface State {
  books: Book[];
}

export interface fetchBooksAction {
  type: ActionType.FETCH_BOOKS;
  payload: Book[];
}

export type Action = fetchBooksAction;
