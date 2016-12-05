import React from 'react';
import { connect } from 'react-redux'
import { changeTimeInterval } from '../actions/actions'

let Annually = ({dispatch}) => {

  const onSubmit = e => {
    let input;
    console.log(e.id);
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch(changeTimeInterval(input.value))
  }

return (
  <form className="select" onSubmit={onSubmit}>
    <button id="annually">Annually</button>
  </form>
)}

Annually = connect()(Annually);
export default Annually
