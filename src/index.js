import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux'
// import getSolarData from './getSolarData';
import dataService from './dataService';
import combinedReducers from './reducers/combinedReducers'


// console.log('data :' getSolarData('Alaska'));
let usState = 'Utah';

dataService(usState);

// getSolarData(usState);

// const reducerFun = (state = {}, action, usState) => {
//   if (state === undefined) state = {};
//   return state;
// }

let store = createStore(combinedReducers,{}, compose(applyMiddleware(dataService), window.devToolsExtension
	? window.devToolsExtension() : f => f))

// let store = createStore(reducerFun)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.dispatch({type: 'GET_SOLAR_DATA', state: 'Florida'})

const loading = (state = false, action) => {
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

export default loading
