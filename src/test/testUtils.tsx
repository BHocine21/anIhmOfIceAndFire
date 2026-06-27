import type { ReactElement } from 'react';
import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import { render, type RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import booksReducer, { type BooksState } from 'store/booksSlice';

export const createTestStore = (preloadedState?: {
  books: BooksState;
}): EnhancedStore<{ books: BooksState }> =>
  configureStore({
    reducer: { books: booksReducer },
    preloadedState,
  });

interface RenderWithProvidersOptions {
  preloadedState?: { books: BooksState };
  initialEntries?: string[];
}

export const renderWithProviders = (
  ui: ReactElement,
  { preloadedState, initialEntries = ['/'] }: RenderWithProvidersOptions = {},
): RenderResult & { store: EnhancedStore<{ books: BooksState }> } => {
  const store = createTestStore(preloadedState);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
      </Provider>,
    ),
  };
};
