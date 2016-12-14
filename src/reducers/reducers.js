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
  if (action.usState !== undefined) {
    return action.usState;
  }
  return state;
}

export const timeInterval = (state = 'annually', action) => {
  if (action.timeInterval !== undefined) {
    return action.timeInterval
  }
  return state;
}

export const pageSelected = (state = 'home', action) => {
  if (action.pageSelected !== undefined) {
    return action.pageSelected
  }
  return state;
}

export const data = (state = {}, action) => {
  if (action.data !== undefined) {
    return action.data
  }
  return state;
}
// 
// export const graphParams = (state = {}, action) => {
//   console.log(action.graphParams);
//   if (action.graphParams !== undefined) {
//     return action.graphParams
//   }
//   return state;
// }

export const combinedReducers = combineReducers({
  pageSelected,
	loading,
	usState,
	timeInterval,
  data
})
