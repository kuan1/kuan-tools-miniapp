import * as CONSTANTS from '../constants'

export function changeRequest(payload) {
  return {
    type: CONSTANTS.SET_QUESTIONS,
    payload
  }
}