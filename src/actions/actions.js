export const changeUSState = (usState) => {
  return {
    type: 'GET_SOLAR_DATA',
    usState
  }
}

export const changeTimeInterval = (timeInterval) => {
  return {
    type: 'SET_TIME_INTERVAL',
    timeInterval
  }
}

export const selectPage = (pageSelected) => {
  return {
    type: 'SET_PAGE_SELECTED',
    pageSelected
  }
}

export const setGraphParams = (graphParams) => {
  return {
    type: 'SET_GRAPH_PARAMS',
    graphParams
  }
}
