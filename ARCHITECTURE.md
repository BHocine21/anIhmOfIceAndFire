# Architecture

This document explains the technical choices made while modernizing this project and how the
codebase is organized.

## Stack

| Concern            | Choice                                            |
| ------------------ | ------------------------------------------------- |
| Framework          | React 19 (TypeScript, `strict` mode)              |
| Build tool         | Vite                                              |
| Package manager    | pnpm                                              |
| Routing            | react-router-dom                                  |
| State management   | Redux Toolkit (`createSlice`, `createAsyncThunk`) |
| Design system      | MUI (Material UI)                                 |
| Linting/formatting | ESLint (flat config) + Prettier + cspell          |
| Unit tests         | Jest + React Testing Library                      |
| E2E tests          | Playwright                                        |

ESLint and `@eslint/js` are pinned to the latest `9.x` line rather than `10.x`: as of this
migration, `eslint-plugin-react` and `eslint-plugin-jsx-a11y` only declare support up to ESLint 9
and crash under ESLint 10's flat config runtime. This will be revisited once those plugins publish
ESLint 10-compatible releases.

## Folder structure

```
src/
  App.tsx                  Root component: theme, router and layout shell
  main.tsx                 Application entry point (React root, Redux Provider)
  assets/                  Static images (logo, header)
  components/
    AppHeader/              Sticky header with the home link
    BookList/               Book list and list item (home page)
    BookDetails/             Book details table and character list
    MainContainer/           Home page container (wires the book list to its data)
    states/                  Shared Loading/Error/Empty state components
  hooks/                    One hook per "smart" component, holding all of its logic
  store/                    Redux store, typed hooks and the books slice
  services/                 Thin axios wrappers around the external API
  constants/                Static values (API URL)
  theme/                    MUI theme (palette, typography)
  types/                    Shared TypeScript types
  utils/                    Pure helper functions (date formatting)
  test/                     Test-only helpers (render utilities, file mocks)
```

## Separation of concerns

Every component that needs state, effects or data fetching delegates that logic to a dedicated
hook (`useApp`, `useMainContainer`, `useBookDetails`), so `.tsx` files only describe what to
render. Purely presentational components (`BookList`, `BookListItem`, `CharacterList`,
`BookDetailsTable`, the `states/*` components) receive plain props and own no logic.

## Data flow

1. `useApp` dispatches `fetchBooks` (a Redux Toolkit async thunk) once, on mount.
2. `fetchBooks` calls the `getBooks` service, then maps the raw API payload into the app's `Book`
   shape (joining authors, formatting the release date, keeping character URLs for later).
3. `booksSlice` stores the books together with a `status` (`idle` | `loading` | `succeeded` |
   `failed`) and an `error` message, which the UI uses to render the right state.
4. On the book details page, `useBookDetails` resolves the book from the already-loaded list by
   its id, then fetches every character's name from its URL before rendering. Loading/error/
   not-found are derived without ever calling `setState` synchronously inside an effect, in line
   with the `react-hooks/set-state-in-effect` rule.

## UI states

Every data-driven view (`MainContainer`, `BookDetails`) renders one of four states: a skeleton
`LoadingState`, an `ErrorState` (MUI `Alert`), an `EmptyState`, or the actual content. This keeps
the loading/error/empty handling consistent and testable across the app.

## Testing strategy

- **Unit tests** cover every hook (with `renderHook` and a real Redux store), every component
  (rendered with React Testing Library, asserting on accessible roles/text), the Redux slice
  reducer/thunk, the API services (axios mocked) and the date utility.
- **E2E tests** (Playwright) run against a production build and a real network call to the
  public API, covering the happy path (browse books → open details) and the not-found path, on
  both desktop Chromium and a mobile viewport.

## Path aliases

Both Vite (`vite.config.ts`) and TypeScript (`tsconfig.app.json` `paths`) declare the same set of
aliases (`components`, `hooks`, `services`, `store`, `theme`, `types`, `utils`, `assets`,
`constants`) so imports stay short and consistent between the app code, Jest and the editor.
