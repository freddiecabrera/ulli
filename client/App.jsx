import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { store } from './store/Store'
import { HelloContainer } from './components/Hello'
import { WorldContainer } from './components/World'

const myRoutes = () => (
  <Route path='/' component={HelloContainer}>
    <Route path='/world' component={WorldContainer} />
  </Route>
)

const App = React.createClass({
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {myRoutes()}
        </Router>
      </Provider>
    )
  }
})

App.Routes = myRoutes
module.exports = App
