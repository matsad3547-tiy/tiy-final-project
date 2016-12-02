import React from 'react';
import { connect } from 'react-redux'
// import {months} from '../data/constants'
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
  <form onSubmit={onSubmit}>
    <button id="annually">Annually</button>
  </form>
)}

Annually = connect()(Annually);
export default Annually

// let Seasonally = ({dispatch}) => (
//   <form onSubmit={onSubmit}>
//     <button type="submit">Seasonally</button>
//     <select className="dropdown" ref={node => input = node}>
//       <option >Select a Season</option>
//       <option value="spring">Spring</option>
//       <option value="summer">Summer</option>
//       <option value="fall">Fall</option>
//       <option value="winter">Winter</option>
//     </select>
//   </form>
// )
//
// export Seasonally = connect()(Seasonally)
//
// let Monthly = ({dispatch}) => (
//   <form onSubmit={onSubmit}>
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
//   <form onSubmit={onSubmit}>
//     <button type="submit">Daily</button>
//     <select className="dropdown" ref={node => input = node}>
//       <option value="today">Today</option>
//     </select>
//   </form>
// )
// export Daily = connect()(Daily)
