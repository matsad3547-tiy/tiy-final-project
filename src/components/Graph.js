import React from 'react';
import { connect } from 'react-redux'
import  {getCurrentState, select}  from '../data/sharedFunctions'
import { months, seasons, monthObjs } from '../data/constants'
import rd3 from 'react-d3'

const getMonthAbvrs = (monthObjs) => {
  let abvrs = []
  monthObjs.map( (obj) => {
    for (let key in obj) {
      abvrs.push(obj[key])
    }
  })
  return abvrs;
}

const getMonthAbv = (month) => {
  let abv = ''
  monthObjs.map( (obj) => {
    for (let key in obj) {
      if (key === month){
        abv = obj[key]
      }
    }
  })
  return abv;
}

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

const sorter = (arr) => {
  let monthAbvrs = getMonthAbvrs(monthObjs)
  let newArr = arr.sort( (a, b) => {
    let aI = (monthAbvrs.indexOf(a.x))
    let bI = (monthAbvrs.indexOf(b.x))
    return aI - bI
  })
  return newArr
}

const findPoint = (arrOfPoints, keyVal) => {
  return arrOfPoints.find( (point) => {
    return point.x === keyVal
  })
}

const getSeasonMonths = (season) => {
  let arrOfMonths = []
  switch (season) {
    case 'spring':
      arrOfMonths = ['mar', 'apr', 'may']
      return arrOfMonths

    case 'summer':
      arrOfMonths = ['jun', 'jul', 'aug']
      return arrOfMonths

    case 'fall':
      arrOfMonths = ['sep', 'oct', 'nov']
      return arrOfMonths

    case 'winter':
      arrOfMonths = ['dec', 'jan', 'feb']
      return arrOfMonths

    default:
      return arrOfMonths
  }
}

const getGraphData = (currentState) => {
  let data = currentState.data.avg_dni
//   console.log(data);
//   let tries = 0;
//   let maxTries = 3;
//   while (data === undefined && tries < maxTries) {
//     setTimeout( ( () => data = currentState.data.avg_dni
// ), 1000)
//     console.log('getting data - tries:', tries);
//     console.log(data);
//     tries++
//   }

  if (data !== undefined) {
    let fullData = sorter(xyAssigner(data.monthly))
    console.log('graph data is found');
    return fullData
  }
  else {
    console.log('graph data is unavailable');
  }
}

const parseGraphData = (dataArr, timeInt) => {

  let selector = select(timeInt);
  let parsedData = [];

  switch (selector) {
    case 'monthly':
    let abvr = getMonthAbv(timeInt)
    parsedData = findPoint(dataArr, abvr)
    return parsedData

    case 'seasonally':
    let abvrs = getSeasonMonths(timeInt)
    abvrs.map( (abv) => {
      parsedData.push(findPoint(dataArr, abv))
    })
    return parsedData

    default: //annually
    return parsedData = dataArr
  }
}

var AreaChart = rd3.AreaChart
// var LineChart = rd3.LineChart


const Graph = (state) => {

  let currentState = getCurrentState(state)
  let fullData = getGraphData(currentState)
  let displayData = parseGraphData(fullData, currentState.timeInterval)
  console.log('display data:', displayData);

  let areaData = [
    {
      name: 'solarData',
      // values: displayData
      values: [ {x: 1, y: 3.63}, {x: 2, y: 4.45}, {x: 3, y: 6.2}, {x: 4, y: 6.63},{x: 5, y: 7.65}, {x: 6, y: 8.96}, {x: 7, y: 8.43}, {x: 8, y: 7.54}, {x: 9, y: 7.69}, {x: 10, y: 6.73}, {x: 11, y: 5.08}, {x: 12, y: 3.75} ]
    }
]
  // console.log('area data:', areaData);

  return (
    <div className="graph">
      <AreaChart
        data={areaData}
        width={800}
        height={300}
        xAxisTickInterval={{unit: 'inches', interval: 1}}
        />
    </div>
  )
}

export default connect(getCurrentState)(Graph)
