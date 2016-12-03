import {combineReducers} from 'redux'
import { loading, usState, timeInterval} from './reducers'

const combinedReducers = combineReducers({
	loading,
	usState,
	timeInterval
})

export default combinedReducers
