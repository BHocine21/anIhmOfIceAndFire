import { ActionType, Action, State } from 'types/types'

import { initialState } from 'constants/constants'

const booksReducer = (state: State = initialState, action: Action): State => {
  if (action.type === ActionType.FETCH_BOOKS) {
    return { books: action.payload }
  }

  return state;
}

export default booksReducer


