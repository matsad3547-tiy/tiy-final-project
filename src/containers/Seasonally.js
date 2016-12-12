import React from 'react';
import { connect } from 'react-redux'
import { changeTimeInterval } from '../actions/actions'
import { seasons } from '../data/constants'

let Seasonally = ({dispatch}) => {

  let input;
  const onSubmit = e => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch(changeTimeInterval(input.value))
  }

return (
  <form className="select" onSubmit={onSubmit}>
    <select className="dropdown" ref={node => input = node}>
      <option value="">Select a Season</option>
      {seasons.map ( (season, i) => <option value={season} key={i}>{season}</option>)}
    </select>
    <button type="submit">Seasonally</button>
  </form>
)}

Seasonally = connect()(Seasonally)
export default Seasonally
