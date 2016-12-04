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
    <button type="submit">Seasonally</button>
    <select className="dropdown" ref={node => input = node}>
      <option value="">Select a Season</option>
      {seasons.map ( (season, i) => <option value={season} key={i}>{season}</option>)}
    </select>
  </form>
)}

Seasonally = connect()(Seasonally)
export default Seasonally

// <option value="spring">Spring</option>
// <option value="summer">Summer</option>
// <option value="fall">Fall</option>
// <option value="winter">Winter</option>
