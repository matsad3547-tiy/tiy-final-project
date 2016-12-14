import React from 'react'

const YAxis = (props) => {

  return (
    <g className="axis axis--y" fill="none" fontSize={props.fontSize} fontFamily="sans-serif" textAnchor="end">

      {[...Array(props.yAxisTicks + 1)].map( (n, i) => <g key={i + 'a'} className="tick" opacity="1" transform={"translate(" + props.marginLeft + "," + props.tickY(i) + ")"}>
      <line key={i + 'b'} stroke={props.axisColor} x2="-6" y1="0.5" y2="0.5"></line>
      <text key={i + 'c'} fill={props.axisColor} x="-9" y="0.5" dy="0.32em">{i}</text>
    </g>
  )}
  <text x="45" y="8" dy="0.35em" textAnchor="start" fill={props.axisColor} >{props.yAxisLabel}</text>
  </g>
  )
}

export default YAxis
