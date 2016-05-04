const redux = require('redux')
import reactRedux from 'react-redux'
import { reducer, initialState } from '../reducers/reducers'

export const store = redux.createStore(reducer, initialState, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))
