import {
	combineReducers
} from 'redux'
import data from './data'
import loading from './loading'
// import visibilityFilter from './visibilityFilter'
// import {createStore, applyMiddleware, compose} from 'redux'


const combinedReducers = combineReducers({
	loading,
	data,
	// visibilityFilter
})

export default combinedReducers
