import React from 'react';
import * as d3 from 'd3'

const Bars = (props: {
                marginLeft: marginLeft,
                data: data,
                height: height,
                width: width,
                scaleFactor: scaleFactor,
                fillColor: fillColor
              }) => {

  const x = d3.scaleBand()
  .rangeRound([0, props.width])
  .padding(0.1)
  .align(0.1)

  const y = d3.scaleLinear()
  .rangeRound([props.height, 0])

  x.domain(props.data.map(d => d.month))

  let barWidth = x.bandwidth()
  const barHeight = d => d * props.scaleFactor
  const xVal = d => x(d.month)
  const yVal = d => props.height - barHeight(d)

  return (
    <g transform={"translate(" + props.marginLeft + ", " + -30 + ")" } >
      {props.data.map( (d, i) => <rect key={i} x={xVal(d)} y={yVal(d.value)} height={barHeight(d.value)} width={barWidth} fill={props.fillColor}></rect>
      )}
    </g>
  )
}

export default Bars
