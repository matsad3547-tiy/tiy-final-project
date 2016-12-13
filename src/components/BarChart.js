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

// const getMonthNums = (monthAbvr) => {
//     let monthNum;
//     monthObjs.map( (obj, i) => {
//      for (let key in obj) {
//        if (obj[key] === monthAbvr) monthNum = i
//      }
//    })
//    return monthNum
//  }
//
//
// const makeDataGraphable = (arrOfPoints) => {
//    let graphablePoints = []
//    arrOfPoints.map( (point) => {
//      let newPoint = point
//      newPoint.x = getMonthNums(point.x)
//      graphablePoints.push(newPoint)
//    })
//    graphablePoints.push({x: 12, y: graphablePoints[graphablePoints.length - 1].y})
//     return graphablePoints
//  }

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
  // let fullData = makeDataGraphable(sorter(xyAssigner(data.monthly)))
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

    // const x = d3.scaleBand()
    //   .rangeRound([0, width])
    //   .padding(0.1)
    //   .align(0.1)
    //
    // const y = d3.scaleLinear()
    //   .rangeRound([height, 0])
    //
    // const z = d3.scaleOrdinal()
    //   .range(['#FDB12B', '#444'])
    //
    // x.domain(data.map(d => d.month))
    // y.domain([0, d3.max(data, d => d.total,)]).nice()

    // let data = [
    //   {'x': 0, 'y': 3.73},
    //   {'x': 1, 'y': 4.54},
    //   {'x': 2, 'y': 5.97},
    //   {'x': 3, 'y': 6.25},
    //   {'x': 4, 'y': 6.54},
    //   {'x': 5, 'y': 6.72},
    //   {'x': 6, 'y': 6.7},
    //   {'x': 7, 'y': 6.59},
    //   {'x': 8, 'y': 6.81},
    //   {'x': 9, 'y': 6.17},
    //   {'x': 10, 'y': 4.83},
    //   {'x': 11, 'y': 3.7}
    // ]

    let barData = [
      {
        'name': 'series1',
        'values': data
      }
    ]

    // let barWidth = x.bandwidth()
    const barHeight = d => d * scaleFactor
    // const xVal = d => x(d.month)
    // const yVal = d => height - barHeight(d) - margin.bottom

    // const axisColor = '#000'
    // const xAxisX = d => xVal(d) + barWidth / 2
    // let fontSize = 17
    // const tickY = (i) => (height - 31) - (i * scaleFactor)
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

// new Array(9)
