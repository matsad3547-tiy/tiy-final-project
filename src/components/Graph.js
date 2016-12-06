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

const getMonthNums = (monthAbvr) => {
  let monthNum;
  monthObjs.map( (obj, i) => {
    for (let key in obj) {
      if (obj[key] === monthAbvr) monthNum = i
    }
  })
  return monthNum
}

// const makeDataGraphable = (arrOfPoints) => {
//   let graphablePoints = []
//   arrOfPoints.map( (point) => {
//     let newPoint = point
//     newPoint.x = getMonthNums(point.x)
//     graphablePoints.push(newPoint)
//   })
//   graphablePoints.push({x: 12, y: graphablePoints[graphablePoints.length - 1].y})
//   return graphablePoints
// }

const getGraphData = (currentState) => {
  let data = currentState.data.avg_lat_tilt
  let fullData = sorter(xyAssigner(data.monthly))
  return fullData
}

const parseGraphData = (dataArr, timeInt) => {

  let selector = select(timeInt);
  let parsedData = [];

  switch (selector) {
    case 'monthly':
    {let abvr = getMonthAbv(timeInt)
      parsedData.push(findPoint(dataArr, abvr))
    // let monthNum = getMonthNums(abvr)
    // let monthNums = []
    // monthNums.push(monthNum)
    // monthNums.push(monthNum + 1)
    // monthNums.map( (num) => {
      // parsedData.push(findPoint(dataArr, num))
    // })
    return parsedData}

    case 'seasonally':
    {let monthAbvrs = getSeasonMonths(timeInt)
    monthAbvrs.map( (abvr) => {
      parsedData.push(findPoint(dataArr, abvr))
    })
    return parsedData}

    default: //annually
    return parsedData = dataArr
  }
}

var BarChart = rd3.BarChart

const Graph = (state) => {

  let currentState = getCurrentState(state)
  console.log(currentState.data.avg_lat_tilt);

  if (currentState.data.avg_lat_tilt !== undefined) {
    let fullData = getGraphData(currentState)
    let displayData = parseGraphData(fullData, currentState.timeInterval)
    console.log('display data:', displayData);

    var barData = [
  {
    "name": "Series A",
    "values": displayData
  }
];

    return (
      <div className="graph">
        <BarChart
          data={barData}
          width={800}
          height={300}
          fill={'#FDB12B'}
          title='Average Solar Energy per Day'
          />
      </div>
    )
  }
  else {
    return (
      <div className="graph">
        Sorry, data could not be retrieved at this time.
      </div>
    )
  }
}

export default connect(getCurrentState)(Graph)
