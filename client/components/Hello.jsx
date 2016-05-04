import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setText } from '../actions/index'

export const Hello = React.createClass({
  textHasbeenSet (text) {
    this.props.dispatch(setText(text))
  },
  render () {
    return (
      <div>
        <h1>{ this.props.text }</h1>
        <Link to={'/world'}>
          <div>
            <button onClick={() => this.textHasbeenSet('World')}>Next</button>
          </div>
        </Link>
      </div>
    )
  }
})

const mapStateToProps = state => {
  return {
    text: state.text
  }
}

export const HelloContainer = connect(mapStateToProps)(Hello)
