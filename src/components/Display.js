import React from 'react';
import { connect } from 'react-redux'
import { getCurrentState, select } from '../data/sharedFunctions'
import Graph from './Graph'

const getGraphTitle = (currentState) => {

  let timeInt = currentState.timeInterval;
  let usState = currentState.usState;
  let selector = select(timeInt);

  switch (selector) {
    case 'annually':
      return 'Here is the annual solar energy intensity for ' + usState;

    case 'seasonally':
      return 'Here is the solar energy intensity for ' + usState + ' in the ' + timeInt;

    case 'monthly':
    return 'Here is the solar energy intensity for ' + usState + ' in ' + timeInt;

    default:
    return 'Please select a time interval';
  }
}

const Display = (state) => {

  let currentState = getCurrentState(state)
  let title = getGraphTitle(currentState)

  return (
    <div className="graph">
      {title}
      <Graph />
    </div>
  )
}

export default connect(getCurrentState)(Display)
