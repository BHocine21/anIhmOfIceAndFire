import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getBookCharacters } from 'services/getBookCharacters';
import { useAppSelector } from 'store/hooks';
import type { Book, BookDetailsViewModel } from 'types/types';

export type BookDetailsStatus = 'idle' | 'loading' | 'succeeded' | 'failed' | 'not-found';

export interface UseBookDetailsResult {
  bookDetails: BookDetailsViewModel | null;
  status: BookDetailsStatus;
}

type CharacterFetchResult =
  | { bookId: number; characters: string[]; failed: false }
  | { bookId: number; characters: null; failed: true };

export const useBookDetails = (): UseBookDetailsResult => {
  const { bookId } = useParams<{ bookId: string }>();
  const { books, status: booksStatus } = useAppSelector((state) => state.books);
  const [characterFetch, setCharacterFetch] = useState<CharacterFetchResult | null>(null);

  const book = useMemo<Book | undefined>(
    () => books.find((candidate) => candidate.id === Number(bookId)),
    [books, bookId],
  );

  useEffect(() => {
    if (!book) {
      return;
    }

    let isCancelled = false;

    const loadCharacters = async (): Promise<void> => {
      try {
        const characters = await getBookCharacters(book.id);

        if (!isCancelled) {
          setCharacterFetch({ bookId: book.id, characters, failed: false });
        }
      } catch {
        if (!isCancelled) {
          setCharacterFetch({ bookId: book.id, characters: null, failed: true });
        }
      }
    };

    void loadCharacters();

    return () => {
      isCancelled = true;
    };
  }, [book]);

  const isCharacterFetchCurrent = characterFetch?.bookId === book?.id;
  const characters = isCharacterFetchCurrent ? (characterFetch?.characters ?? null) : null;
  const charactersFailed = isCharacterFetchCurrent ? (characterFetch?.failed ?? false) : false;

  const status: BookDetailsStatus = useMemo(() => {
    if (booksStatus === 'idle' || booksStatus === 'loading') {
      return 'idle';
    }
    if (booksStatus === 'failed') {
      return 'failed';
    }
    if (!book) {
      return 'not-found';
    }
    if (charactersFailed) {
      return 'failed';
    }
    if (!characters) {
      return 'loading';
    }

    return 'succeeded';
  }, [booksStatus, book, charactersFailed, characters]);

  const bookDetails: BookDetailsViewModel | null = useMemo(() => {
    if (!book || !characters) {
      return null;
    }

    const { characterUrls, ...bookWithoutUrls } = book;
    void characterUrls;

    return { ...bookWithoutUrls, characters };
  }, [book, characters]);

  return { bookDetails, status };
};
