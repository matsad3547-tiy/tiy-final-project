import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux'
import dataService from './dataService';
import {combinedReducers} from './reducers/reducers'

export let store = createStore(combinedReducers,{}, compose(applyMiddleware(dataService), window.devToolsExtension
	? window.devToolsExtension() : f => f))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.dispatch({
  type: 'GET_SOLAR_DATA',
  usState: 'Utah'
})
