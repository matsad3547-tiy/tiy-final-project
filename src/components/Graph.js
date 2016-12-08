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

            // let data = [ {x: 1, y: 3.63}, {x: 2, y: 4.45}, {x: 3, y: 6.2}, {x: 4, y: 6.63},{x: 5, y: 7.65}, {x: 6, y: 8.96}, {x: 7, y: 8.43}, {x: 8, y: 7.54}, {x: 9, y: 7.69}, {x: 10, y: 6.73}, {x: 11, y: 5.08}, {x: 12, y: 3.75} ]

    let width = graphWidth
    let height = 300

    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .align(0.1)

    const y = d3.scaleLinear()
      .rangeRound([height, 0])

    const z = d3.scaleOrdinal()
      .range(['#FDB12B', '#444'])

    // var color = d3.scaleOrdinal(d3.schemeCategory20);
    x.domain(data.map(d => d.x))
    y.domain([0, d3.max(data, d => d.total,)]).nice()
    // z.domain(data.columns.slice(1))

    let scaleFactor = 30
    const yVal = d => -y(d[1].y)
    let barWidth = x.bandwidth()
    const xVal = i => {
      console.log(i);
      console.log(barWidth);
      return ((i * barWidth ))
    }
    const barHeight = yVal => yVal * scaleFactor
    console.log('data:', data);

    return (
      <div>

        <svg width={graphWidth} height={height}>
        	<g transform={"translate(0," - height + ")"} fill={z(1)}>

            {data.map( (d, i) => <rect key={i} x={xVal(i)} y={0} height={barHeight(d.y)} width={barWidth}></rect>
            )}

          </g>
          <g className="axis axis--y"></g>
        </svg>
      </div>
    )
  }
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
