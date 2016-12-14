import React from 'react';
import { connect } from 'react-redux'
import { setGraphParams } from '../actions/actions'

let DispatchGraphParams = (graphData, graphWidth, {dispatch}) => {

  let graphParams = {
    scaleFactor: 30,
    margin: {top: '20vw', right: 0, bottom: 0, left: '40'},
    svgWidth: graphWidth,
    svgHeight: '300vw',
    fillColor: '#FDB12B',
    graphData: graphData
  }

  dispatch(setGraphParams(graphParams))
}

DispatchGraphParams = connect()(DispatchGraphParams)

export default DispatchGraphParams
