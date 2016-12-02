export const changeUSState = (input) => {
  return {
    type: 'GET_SOLAR_DATA',
    usState: input
  }
}

export const changeTimeInterval = (state, input) => {
  return {
    type: 'GET_SOLAR_DATA',
    // usState: state.usState,
    timeInterval: input
  }
}

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
