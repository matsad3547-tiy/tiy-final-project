import React from 'react';
import { connect } from 'react-redux'
import { months, seasons } from '../data/constants'

const getCurrentState = (state) => {
  return {
    usState: state.usState,
    timeInterval: state.timeInterval,
    data: state.data
  }
}

const select = (timeInt) => {
  if (months.includes(timeInt)) return 'monthly';
  if (seasons.includes(timeInt)) return 'seasonally';
  if (timeInt === 'annually') return 'annually';
}

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

const Graph = (state) => {

  let currentState = getCurrentState(state)
  let title = getGraphTitle(currentState)

  return (
    <div className="graph">
      {title}
    </div>
  )
}

export default connect(getCurrentState)(Graph)
