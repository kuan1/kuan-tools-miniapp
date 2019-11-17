import * as CONSTANTS from '../constants/index'

const INITIAL_STATE = {
  list: [],
  total: 0,
  current: 0,
  history: []
}

export default function requests(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONSTANTS.SET_QUESTIONS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}