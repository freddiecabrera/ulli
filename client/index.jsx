import React from 'react'
import ReactDOM from 'react-dom'

const Hello = React.createClass({
  render () {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
})

ReactDOM.render(<Hello />, document.getElementById('app'))
