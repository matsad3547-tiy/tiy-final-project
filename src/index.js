import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import getSolarData from './getSolarData';


// console.log('data :' getSolarData('Alaska'));
let usState = 'Florida';

getSolarData(usState)

const reducerFun = (state = {}, action, usState) => {
  if (state === undefined) state = {};
  return state;
}

let store = createStore(reducerFun)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
