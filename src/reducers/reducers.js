import {combineReducers} from 'redux'

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

export const usState = (state = 'Utah', action) => {
  // console.log(action);
  if (action.usState !== undefined) {
    // console.log('action = ', action );
    return action.usState;
  }
  return state;
}

export const timeInterval = (state = 'daily', action) => {
// console.log(action);
  if (action.timeInterval !== undefined) {
    // console.log('state = ', state.usState );
    return action.timeInterval
  }
  return state;
}

export const data = (state = {}, action) => {
  if (action.data !== undefined) {
    return action.data
  }
  return state;
}

// const data = (state = [], action) => {
// 	switch (action.type) {
// 	case 'ADD_TODO':
// 		return [
// 			...state,
// 			todo(undefined, Object.assign(action, {
// 				id: state.length
// 			}))
// 		]
// 	case 'TOGGLE_TODO':
// 		return state.map(t =>
// 			todo(t, action)
// 		)
// 	case 'GET_SOLAR_DATA_RECEIVED':
// 		return action.data
// 	default:
// 		return state
// 	}
// }

export const combinedReducers = combineReducers({
	loading,
	usState,
	timeInterval,
  data
})
