import React from 'react';
import { connect } from 'react-redux'
import  {getCurrentState, select}  from '../data/sharedFunctions'
import { monthObjs } from '../data/constants'
import DispatchGraphParams from '../containers/DispatchGraphParams'
// import { setGraphParams } from '../actions/actions'
import * as d3 from 'd3'

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
    return point.month === keyVal
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
      newObj.month = key
      newObj.value = obj[key]
      arr.push(newObj)
    }
  }
  return arr
}

const sorter = (arr) => {
  let monthAbvrs = getMonthAbvrs(monthObjs)
  let newArr = arr.sort( (a, b) => {
    let aI = (monthAbvrs.indexOf(a.month))
    let bI = (monthAbvrs.indexOf(b.month))
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

// let dispatchGraphParams = (graphData, graphWidth, {dispatch}) => {
//
//   let graphParams = {
//     scaleFactor: 30,
//     margin: {top: '20vw', right: 0, bottom: 0, left: '40'},
//     svgWidth: graphWidth,
//     svgHeight: '300vw',
//     fillColor: '#FDB12B',
//     graphData: graphData
//   }
//
//   dispatch(setGraphParams(graphParams))
// }

let Graph = (state) => {

  let currentState = getCurrentState(state)

  if (currentState.data.avg_lat_tilt !== undefined) {
    let fullData = getGraphData(currentState)
    let graphData = parseGraphData(fullData, currentState.timeInterval)
    // console.log(graphData);
    let graphWidth = getGraphWidth(currentState.timeInterval)

    // DispatchGraphParams(graphData, graphWidth)

    let graphParams = {
      scaleFactor: 30,
      margin: {top: 20, right: 0, bottom: 0, left: 40},
      svgWidth: graphWidth,
      svgHeight: 300,
      fillColor: '#FDB12B',
      graphData: graphData
    }

    let scaleFactor = graphParams.scaleFactor

    let width = graphParams.svgWidth - graphParams.margin.left
    //
    let height = graphParams.svgHeight - graphParams.margin.top
    // console.log('height:', height);

    let data = graphParams.graphData
    // console.log('Graph data:', data);

    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .align(0.1)

    const y = d3.scaleLinear()
      .rangeRound([height, 0])

    x.domain(data.map(d => d.month))

    let fillColor = '#FDB12B'
    let barWidth = x.bandwidth()
    const barHeight = d => d * scaleFactor
    const xVal = d => x(d.month)
    const yVal = d => height - barHeight(d)

    const axisColor = '#000'
    const xAxisX = d => xVal(d) + barWidth / 2
    let fontSize = 17
    const tickY = (i) => (height - 31) - (i * scaleFactor)
    const yAxisTicks = 8
    const yAxisLabel = 'kWh/m\u00B2/day'

    return (
      <div>

        <svg width={graphWidth} height={graphParams.svgHeight} >
        	<g transform={"translate(" + graphParams.margin.left + ", " + -30 + ")" } >
            {data.map( (d, i) => <rect  className="" key={i} x={xVal(d)} y={yVal(d.value)} height={barHeight(d.value)} width={barWidth} fill={fillColor}></rect>
            )}
          </g>
          <g className="axis axis--x" transform={"translate(" + graphParams.margin.left + ", " + 250 + ")"} textAnchor="middle" fontSize={fontSize} fontFamily="sans-serif">

            {data.map((d, i) => <g key={i} className="tick" opacity="1" transform={"translate(" + xAxisX(d) + ",0)"}>
            <line stroke={axisColor} y2="6" x1="0.5" x2="0.5"></line>
            <text fill={axisColor} y="9" x="0.5" dy="0.71em">{d.month}</text></g>
          )}
          </g>

          <g className="axis axis--y" fill="none" fontSize={fontSize} fontFamily="sans-serif" textAnchor="end">

            {[...Array(yAxisTicks + 1)].map( (n, i) => <g key={i + 'a'} className="tick" opacity="1" transform={"translate(" + graphParams.margin.left + "," + tickY(i) + ")"}>
              <line key={i + 'b'} stroke={axisColor} x2="-6" y1="0.5" y2="0.5"></line>
              <text key={i + 'c'} fill={axisColor} x="-9" y="0.5" dy="0.32em">{i}</text>
            </g>
            )}
          <text x="45" y="8" dy="0.35em" textAnchor="start" fill={axisColor} >{yAxisLabel}</text>
        </g>

        </svg>
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

Graph = connect(getCurrentState)(Graph)

// dispatchGraphParams = connect()(dispatchGraphParams)



export default Graph
