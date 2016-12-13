import React from 'react';
import { connect } from 'react-redux'
import  {getCurrentState, select}  from '../data/sharedFunctions'
import { monthObjs } from '../data/constants'
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

const Graph = (state) => {

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

    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .align(0.1)

    const y = d3.scaleLinear()
      .rangeRound([height, 0])

    const z = d3.scaleOrdinal()
      .range(['#FDB12B', '#444'])

    x.domain(data.map(d => d.month))
    y.domain([0, d3.max(data, d => d.total,)]).nice()


    let barWidth = x.bandwidth()
    const barHeight = d => d * scaleFactor
    const xVal = d => x(d.month)
    const yVal = d => height - barHeight(d) - margin.bottom

    const axisColor = '#000'
    const xAxisX = d => xVal(d) + barWidth / 2
    let fontSize = 17
    const tickY = (i) => (height - 31) - (i * scaleFactor)
    const yAxisTicks = 8
    const yAxisLabel = 'kWh/m\u00B2/day'

    return (
      <div>

        <svg width={graphWidth} height={height} >
        	<g transform={"translate(" + margin.left + ", " + margin.top + ")" } fill={z(1)} >
            {data.map( (d, i) => <rect className="" key={i} x={xVal(d)} y={yVal(d.value)} height={barHeight(d.value)} width={barWidth}></rect>
            )}
          </g>
          <g className="axis axis--x" transform={"translate(" + 40 + ", 250)"} textAnchor="middle" fontSize={fontSize} fontFamily="sans-serif">

            {data.map((d, i) => <g key={i} className="tick" opacity="1" transform={"translate(" + xAxisX(d) + ",0)"}>
            <line stroke={axisColor} y2="6" x1="0.5" x2="0.5"></line>
            <text fill={axisColor} y="9" x="0.5" dy="0.71em">{d.month}</text></g>
          )}
          </g>

          <g className="axis axis--y" fill="none" fontSize={fontSize} fontFamily="sans-serif" textAnchor="end">

            {[...Array(yAxisTicks + 1)].map( (n, i) => <g key={i + 'a'} className="tick" opacity="1" transform={"translate(40," + tickY(i) + ")"}>
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

export default connect(getCurrentState)(Graph)
