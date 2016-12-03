import React from 'react';
import { connect } from 'react-redux'
import { usStates } from '../data/constants'
import { changeUSState } from '../actions/actions'

let USStateSelect = ({ dispatch }) => {
  let input;
  const onSubmit = e => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch(changeUSState(input.value))
  }

  return (
    <div className="select">
      <form onSubmit={onSubmit}>
        <h3>Select a State</h3>
        <button type="submit" className="select">Select a State</button>
        <select className="dropdown" ref={node => input = node}>
          <option>States</option>
          {usStates.map( (usState, i) => <option key={i} value={usState}>{usState}</option>)}
        </select>
      </form>
    </div>
  )
}

USStateSelect = connect()(USStateSelect)

export default USStateSelect
