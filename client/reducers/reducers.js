import { SET_TEXT } from '../actions/index'

const initialState = {
  text: 'Hello'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return addTextReducer(state, action)
    default:
      return state
  }
}

const addTextReducer = (state, action) => {
  const text = action.text
  return Object.assign({}, state, { text })
}

module.exports = { reducer }
