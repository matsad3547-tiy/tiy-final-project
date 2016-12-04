import React from 'react';

import { connect } from 'react-redux'

const getCurrentState = (state) => {
  return {
    usState: state.usState,
    timeInterval: state.timeInterval,
    data: state.data
  }
}

const Graph = (state) => {

  let currentState = getCurrentState(state);

  return (
    <div className="graph">
      Here is the solar intensity in {currentState.usState} for {currentState.timeInterval}
    </div>
  )
}

export default connect(getCurrentState)(Graph)
