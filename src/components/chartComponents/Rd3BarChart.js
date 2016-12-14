import React from 'react';
import { connect } from 'react-redux'
import  {getCurrentState, select}  from '../data/sharedFunctions'
import { monthObjs } from '../data/constants'
import rd3 from 'react-d3'

const getMonthAbvrs = (monthObjs) => {
  let abvrs = []
  monthObjs.map( (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) abvrs.push(obj[key])
    }
  })
  return abvrs;
}

const getMonthAbv = (month) => {
  let abv = ''
  monthObjs.map( (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === month){
          abv = obj[key]
        }
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
    if (obj.hasOwnProperty(key)) {
      let newObj = {}
      newObj.x = key
      newObj.y = obj[key]
      arr.push(newObj)
    }
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

const getGraphWidth = (timeInt) => {
  let selector = select(timeInt)
  let graphWidth = 0
  switch (selector) {
    case 'monthly':
      return graphWidth = 200

    case 'seasonally':
      return graphWidth = 300

    default:
    return graphWidth = 750
  }
}

const Graph = (state) => {

  var BarChart = rd3.BarChart

  let currentState = getCurrentState(state)
  console.log(currentState.data.avg_lat_tilt);

  if (currentState.data.avg_lat_tilt !== undefined) {
    let fullData = getGraphData(currentState)
    let data = parseGraphData(fullData, currentState.timeInterval)
    let graphWidth = getGraphWidth(currentState.timeInterval)

    let scaleFactor = 30

    let svgWidth = graphWidth

    let svgHeight = 350

    let margin = {top: 20, right: 20, bottom: 50, left: 40}

    let width = svgWidth - margin.left - margin.right
    let height = svgHeight - margin.top - margin.bottom

    console.log(data);

    let barData = [
      {
        'name': 'series1',
        'values': data
      }
    ]

    const barHeight = d => d * scaleFactor
    const yAxisTicks = 8
    const yAxisLabel = 'kWh/m\u00B2/day'

    return (
      <div>
        <BarChart
          data={barData}
          width={width}
          height={height}
          fill={'#FDB12B'}
          yAxisLabel={yAxisLabel}
          yAxisLabelOffset={25}
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
