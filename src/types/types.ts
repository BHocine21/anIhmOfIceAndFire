export interface RawBook {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: string[];
}

export interface RawCharacter {
  url: string;
  name: string;
}

export interface Book {
  id: number;
  name: string;
  authors: string;
  numberOfPages: number;
  publisher: string;
  country: string;
  released: string;
  characterUrls: string[];
}

export interface BookDetailsViewModel extends Omit<Book, 'characterUrls'> {
  characters: string[];
}

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
