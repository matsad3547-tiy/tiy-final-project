export const changeUSState = (usState) => {
  return {
    type: 'GET_SOLAR_DATA',
    usState
  }
}

export const changeTimeInterval = (timeInterval) => {
  console.log('time interval: ', timeInterval);
  return {
    type: 'SET_TIME_INTERVAL',
    timeInterval
  }
}
