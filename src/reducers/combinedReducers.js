import {combineReducers} from 'redux'
// import data from './data'
// import loading from './loading'
// import setUsState from './setUsState'
// import setTimeInterval from './setTimeInterval'
import { loading, usState, timeInterval} from './reducers'
// import {usState} from './reducers'
// import visibilityFilter from './visibilityFilter'
// import {createStore, applyMiddleware, compose} from 'redux'


const combinedReducers = combineReducers({
	loading,
	usState,
	timeInterval
})

export default combinedReducers
