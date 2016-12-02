export const loading = (state = false, action) => {
  switch (action.type) {
    case 'GET_SOLAR_DATA':
    return true
    case 'GET_SOLAR_DATA_RECEIVED':
    return false
    case 'GET_SOLAR_DATA_ERROR':
    return false
    default:
    return state
  }
}

export const usState = (state = false, action) => {
  // console.log(action);
  if (action.usState !== undefined) {
    console.log('action = ', action );
    return {usState: action.usState};
  }
  return state;
}

export const timeInterval = (state = false, action) => {
console.log('state = ', state.usState );
console.log(action);
  if (action.timeInterval !== undefined) {
    console.log('cheese');
    return {
      usState: state.usState,
      timeInterval: action.timeInterval
    };
  }
  return state;
}
