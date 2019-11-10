import * as CONSTANTS from '../constants/index'

const INITIAL_STATE = {
  list: []
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