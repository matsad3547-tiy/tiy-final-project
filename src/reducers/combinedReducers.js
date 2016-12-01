import {
	combineReducers
} from 'redux'
// import data from './data'
import loading from './loading'
import usState from './usState'
// import visibilityFilter from './visibilityFilter'
// import {createStore, applyMiddleware, compose} from 'redux'


const combinedReducers = combineReducers({
	loading,
	usState,
	// data,
	// visibilityFilter
})

export default combinedReducers
