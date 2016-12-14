import React from 'react';
import * as d3 from 'd3'
import Bars from './Bars'


const BarChart = (props: {graphParams: graphParams}) => {

  let scaleFactor = props.graphParams.scaleFactor
  let margin = props.graphParams.margin
  let svgWidth = props.graphParams.svgWidth
  let svgHeight = props.graphParams.svgHeight
  let fillColor = props.graphParams.fillColor
  let data = props.graphParams.graphData

  let width = svgWidth - margin.left

  let height = svgHeight - margin.top




  const x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1)
  .align(0.1)

  const y = d3.scaleLinear()
  .rangeRound([height, 0])

  x.domain(data.map(d => d.month))

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
      <svg width={svgWidth} height={svgHeight} >
        <Bars
          marginLeft={margin.left}
          data={data}
          height={height}
          width={width}
          scaleFactor={scaleFactor}
          fillColor={fillColor}
          />


    <g className="axis axis--x" transform={"translate(" + props.graphParams.margin.left + ", " + 250 + ")"} textAnchor="middle" fontSize={fontSize} fontFamily="sans-serif">

      {data.map((d, i) => <g key={i} className="tick" opacity="1" transform={"translate(" + xAxisX(d) + ",0)"}>
      <line stroke={axisColor} y2="6" x1="0.5" x2="0.5"></line>
      <text fill={axisColor} y="9" x="0.5" dy="0.71em">{d.month}</text></g>
    )}
  </g>

  <g className="axis axis--y" fill="none" fontSize={fontSize} fontFamily="sans-serif" textAnchor="end">

    {[...Array(yAxisTicks + 1)].map( (n, i) => <g key={i + 'a'} className="tick" opacity="1" transform={"translate(" + props.graphParams.margin.left + "," + tickY(i) + ")"}>
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

export default BarChart
