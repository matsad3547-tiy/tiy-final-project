import React from 'react';
import { connect } from 'react-redux'
import { changeTimeInterval } from '../actions/actions'

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
      <option value="spring">Spring</option>
      <option value="summer">Summer</option>
      <option value="fall">Fall</option>
      <option value="winter">Winter</option>
    </select>
  </form>
)}

Seasonally = connect()(Seasonally)
export default Seasonally
//
// let Monthly = ({dispatch}) => (
//   <form className="select" onSubmit={onSubmit}>
//     <button type="submit" >Monthly</button>
//     <select className="dropdown"ref={node => input = node}>
//       <option>Select a Month</option>
//       {months.map( (month, i) => <option key={i} value={month}>{month}</option>)}
//     </select>
//   </form>
// )
// export Monthly = connect()(Monthly)
//
// let Daily = ({dispatch}) => (
//   <form className="select" onSubmit={onSubmit}>
//     <button type="submit">Daily</button>
//     <select className="dropdown" ref={node => input = node}>
//       <option value="today">Today</option>
//     </select>
//   </form>
// )
// export Daily = connect()(Daily)
