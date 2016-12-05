import React from 'react';
import { connect } from 'react-redux'
import  {getCurrentState, select}  from '../data/sharedFunctions'
import { months, seasons, monthObjs } from '../data/constants'
import rd3 from 'react-d3'

//Utah Data
const annualData = {
  'apr': 6.63,
  'aug': 7.54,
  'dec': 3.75,
  'feb': 4.45,
  'jan': 3.63,
  'jul': 8.43,
  'jun': 8.96,
  'mar': 6.2,
  'may': 7.65,
  'nov': 5.08,
  'oct': 6.73,
  'sep': 7.69
}

// console.log(months);
// console.log(monthObjs);

const getMonthAbvrs = (monthObjs) => {
  let abvrs = []
  monthObjs.map( (obj) => {
    for (let key in obj) {
      abvrs.push(obj[key])
    }
  })
  return abvrs;
}

// console.log(getMonthAbvrs(monthObjs));

const xyAssigner = (obj) => {
  let arr = []
  for (let key in obj) {
    let newObj = {}
    newObj.x = key
    newObj.y = obj[key]
    arr.push(newObj)
  }
  return arr
}

// console.log(getMonthAbvrs(monthObjs));

// const sortData = (data) => {
//   let abvrs = getMonthAbvrs(monthObjs);
//   abvrs.map ( abv => {
//     if (abv)
//   })
// }



const getGraphData = (currentState) => {
  // let timeInt = currentState.timeInterval;
  // let data = '';
  // let dataPromise = currentState.data.avg_dni
  // dataPromise.then( (d) => console.log('annual data: ', d.annual))

  let data = currentState.data.avg_dni
  if (data !== undefined) {
    console.log('monthly data:', data.monthly);
  }
  // else console.log('data: ', data);
  // let selector = select(timeInt);
  // let dataArr = [];

  // console.log(Object.values(data));

  // switch (selector)
  //   case 'annually':
  //   dataArr = data
  //
  //
  //
  //   default:
  //   return 'There is no data to display'
  //
  //
  return 42;
}


const Graph = (state) => {

  let currentState = getCurrentState(state)
  let displayData = getGraphData(currentState)

  return (
    <div className="graph">
      Graph goes here
    </div>
  )
}


export default connect(getCurrentState)(Graph)
