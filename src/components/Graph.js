import React from 'react';
import { connect } from 'react-redux'
import  {getCurrentState, select}  from '../data/sharedFunctions'
import { months, seasons, monthObjs } from '../data/constants'
import * as d3 from 'd3'
// import { d3.scale } from 'd3'

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
    let newObj = {}
    newObj.month = key
    newObj.value = obj[key]
    arr.push(newObj)
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
  let graphWidth
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
    // console.log('display data:', data);

    let svgWidth = graphWidth
    let svgHeight = 300

    let margin = {top: 20, right: 20, bottom: 30, left: 40}

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
    // z.domain(data.columns.slice(1))

    let scaleFactor = 30

    let barWidth = x.bandwidth()
    const barHeight = d => d * scaleFactor
    // const yVal = (d) => {
    //   console.log(d);
    //   return y(d)
    // }
    // const xVal = i => { //works
    //   return i * (barWidth + 8)
    // }
    const xVal = d => {
      return x(d.month)
    }
    console.log('data:', data);

    return (
      <div>

        <svg width={graphWidth} height={height} >
        	<g transform={"translate(" + margin.left + ", " + margin.top + ")" } fill={z(1)} >
            {data.map( (d, i) => <rect key={i} x={xVal(d)} y={height - barHeight(d.value)} height={barHeight(d.value)} width={barWidth}></rect>
            )}

          </g>
          <g className="axis axis--y"></g>
        </svg>
      </div>
    )
  }

  // y={height - barHeight(d.value)}

  // <rect x={0} y={0} height={10} width={10} style={{fill: '#111'}}></rect>
  // <rect x={0} y={height - margin.bottom} height={10} width={10} style={{fill: '#111'}}></rect>
  // <rect x={width + 10} y={height - margin.bottom} height={10} width={10} style={{fill: '#111'}}></rect>
  // <rect x={width + 10} y={0} height={10} width={10} style={{fill: '#111'}}></rect>

  // <rect x={50} y={height - 200} height={200} width={10} style={{fill: '#f00'}}></rect>
  // <rect x={65} y={height - 220} height={220} width={10} style={{fill: '#f00'}}></rect>

//
//               <rect x={2} y={5} width={x.bandwidth()} height={barHeight(data[3].y)  }></rect>
//
//   {data.map( (d, i) => <rect key={i} x={d => x(d.data.x) y={d => d[1]} height={barHeight} width={barWidth} }></rect>
// )}

  // if (currentState.data.avg_lat_tilt !== undefined) {
  //   let fullData = getGraphData(currentState)
  //   let displayData = parseGraphData(fullData, currentState.timeInterval)
  //   let graphWidth = getGraphWidth(currentState.timeInterval)
  //   console.log('display data:', displayData);
  //
  //   // let barData = [
  //   //   {
  //   //     "name": "Series A",
  //   //     "values": displayData
  //   //   }
  //   // ];
  //
  //
  //   var data = [
  //     { apples: 53245, oranges:	200 },
  //     { apples: 28479, oranges:	200 },
  //     { apples: 19697, oranges:	200 },
  //     { apples: 24037, oranges:	200 },
  //     { apples: 40245, oranges:	200 }
  //   ];
  //
  //   // var width = 640
  //   let height = 300
  //   var radius = Math.min(graphWidth, height) / 2;
  //
  //   var color = d3.scaleOrdinal(d3.schemeCategory20);
  //
  //   var pie = d3.pie()
  //       // .value(d => d[this.state.dataset])
  //       // .value(d => d['apples'])
  //       .value(d => d['y'])
  //       // .value(d => {
  //       //   console.log(d);
  //       //   return  d[data.apples]
  //       //   })
  //       .sort(null);
  //
  //   var arc = d3.arc()
  //       .innerRadius(radius - 100)
  //       .outerRadius(radius - 20);
  //
  //   // var displayedData = pie(data);
  //   var displayedData = pie(displayData);
  //
  //   return (
  //     <div>
  //
  //       <svg width={graphWidth} height={height}>
  //       	<g transform={"translate(" + graphWidth / 2 + "," + height / 2 + ")"}>
  //         	{displayedData.map((slice, i) =>
  //           	<path
  //             	fill={color(i)}
  //             	key={i}
  //               d={arc(slice)} />
  //           )}
  //         </g>
  //       </svg>
  //     </div>
  //   )
  // }


  else {
    return (
      <div className="graph">
        Sorry, data could not be retrieved at this time.
      </div>
    )
  }
}

export default connect(getCurrentState)(Graph)
