import React from 'react';

const Bars = (props) => {

  return (
    <g transform={"translate(" + props.marginLeft + ", " + -30 + ")" } >
      {props.data.map( (d, i) => <rect key={i} x={props.xVal(d)} y={props.yVal(d.value)} height={props.barHeight(d.value)} width={props.barWidth} fill={props.fillColor}></rect>
      )}
    </g>
  )
}

export default Bars
