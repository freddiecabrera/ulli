import React from 'react'
import { connect } from 'react-redux'

const World = React.createClass({
  render () {
    return (
      <div>
        <h1>{this.props.text}</h1>
      </div>
    )
  }
})

const mapStateToProps = state => {
  return {
    text: state.text
  }
}

export const WorldContainer = connect(mapStateToProps)(World)
