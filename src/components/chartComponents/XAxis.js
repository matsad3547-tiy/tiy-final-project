import React from 'react'

const XAxis = (props) => {

  return (
    <g className="axis axis--x" transform={"translate(" + props.marginLeft + ", " + 250 + ")"} textAnchor="middle" fontSize={props.fontSize} fontFamily="sans-serif">

      {props.data.map((d, i) => <g key={i} className="tick" opacity="1" transform={"translate(" + props.xAxisX(d) + ",0)"}>
      <line stroke={props.axisColor} y2="6" x1="0.5" x2="0.5"></line>
      <text fill={props.axisColor} y="9" x="0.5" dy="0.71em">{d.month}</text></g>
      )}
    </g>
  )
}

export default XAxis
