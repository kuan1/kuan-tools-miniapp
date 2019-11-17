import * as CONSTANTS from '../constants'

export function changeQuestion(payload) {
  return {
    type: CONSTANTS.SET_QUESTIONS,
    payload
  }
}