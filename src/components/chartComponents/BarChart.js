import React from 'react';
import * as d3 from 'd3'
import Bars from './Bars'
import XAxis from './XAxis'
import YAxis from './YAxis'

const BarChart = (props: {graphParams: graphParams}) => {

  let scaleFactor = props.graphParams.scaleFactor
  let margin = props.graphParams.margin
  let svgWidth = props.graphParams.svgWidth
  let svgHeight = props.graphParams.svgHeight
  let fillColor = props.graphParams.fillColor
  let axisColor = props.graphParams.axisColor
  let data = props.graphParams.graphData
  let fontSize = props.graphParams.fontSize
  let yAxisLabel = props.graphParams.yAxisLabel
  let yAxisTicks = props.graphParams.yAxisTicks

  let width = svgWidth - margin.left - margin.right

  let height = svgHeight - margin.top - margin.bottom

  const x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1)
  .align(0.1)

  x.domain(data.map(d => d.month))

  let barWidth = x.bandwidth()
  const barHeight = d => d * scaleFactor
  const xVal = d => x(d.month)
  const yVal = d => height - barHeight(d)
  const xAxisX = d => xVal(d) + barWidth / 2
  const tickY = (i) => (height - 31) - (i * scaleFactor)

  let viewBox = [0, 0, width + 50, height].join(' ')

  return (
    <div>
      <svg
        height={height}
        width="100%"
        viewBox={viewBox}
        preserveAspectRatio="xMaxYMax meet"
        >
        <Bars
          marginLeft={margin.left}
          data={data}
          height={height}
          width={width}
          scaleFactor={scaleFactor}
          fillColor={fillColor}
          xVal={xVal}
          yVal={yVal}
          barHeight={barHeight}
          barWidth={barWidth}
          />
        <XAxis
          marginLeft={margin.left}
          fontSize={fontSize}
          data={data}
          xAxisX={xAxisX}
          axisColor={axisColor}
          />
        <YAxis
          marginLeft={margin.left}
          fontSize={fontSize}
          tickY={tickY}
          axisColor={axisColor}
          yAxisLabel={yAxisLabel}
          yAxisTicks={yAxisTicks}
          />

      </svg>
    </div>
  )
}

export default BarChart

// width={svgWidth} height={svgHeight}
