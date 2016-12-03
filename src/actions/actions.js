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
