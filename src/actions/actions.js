// let nextTodoId = 0
export const changeUSState = (input) => {
  console.log('action ', input);
  return {
    type: 'GET_SOLAR_DATA',
    usState: input
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
