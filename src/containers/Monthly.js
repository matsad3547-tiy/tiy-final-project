import React from 'react';
import { connect } from 'react-redux'
import { changeTimeInterval } from '../actions/actions'
import { months } from '../data/constants'

let Monthly = ({dispatch}) => {

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
      <button type="submit" >Monthly</button>
      <select className="dropdown"ref={node => input = node}>
        <option>Select a Month</option>
        {months.map( (month, i) => <option key={i} value={month}>{month}</option>)}
      </select>
    </form>
  )
}

Monthly = connect()(Monthly)
export default Monthly
