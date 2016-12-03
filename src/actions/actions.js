export const changeUSState = (usState) => {
  return {
    type: 'GET_SOLAR_DATA',
    usState
  }
}

export const changeTimeInterval = (timeInterval) => {
  // console.log(state);
  return {
    type: 'SET_TIME_INTERVAL',
    timeInterval
  }
}

// export const

// export const setVisibilityFilter = (filter) => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter
//   }
// }
//
// export const toggleTodo = (id) => {
//   return {
//     type: 'TOGGLE_TODO',
//     id
//   }
// }
