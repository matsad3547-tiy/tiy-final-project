import React from 'react';
import { connect } from 'react-redux'
import { changeTimeInterval } from '../actions/actions'

let Annually = ({dispatch}) => {

  const onClick = e => {
    e.preventDefault()
    dispatch(changeTimeInterval('annually'))
  }

return (
  <form className="select" onClick={onClick}>
    <button id="annually">Annually</button>
  </form>
)}

Annually = connect()(Annually);
export default Annually
