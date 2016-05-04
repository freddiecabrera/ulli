import React from 'react'
import { Provider } from 'react-redux'
import { hashHistory, IndexRoute, Route, Router } from 'react-router'
import { store } from './store/Store'
import Hello from './components/Hello'
import World from './components/World'

const App = React.createClass({
  render () {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/'>
            <IndexRoute component={Hello} />
            <Route path='/world' component={World} />
          </Route>
        </Router>
      </Provider>
    )
  }
})

module.exports = App
