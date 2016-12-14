import React from 'react';
import Display from './Display'
import USStateSelect from '../containers/USStateSelect'
import Annually from '../containers/Annually'
import Seasonally from '../containers/Seasonally'
import Monthly from '../containers/Monthly'
import { connect } from 'react-redux'
import { getCurrentState }  from '../data/sharedFunctions'
import About from './About'
import Links from './Links'

const Input = () => (
  <div className="input">
    <USStateSelect />
    <TimeIntervalSelect />
  </div>
)

const TimeIntervalSelect = () => (
  <div>
    <h4>Select a Time Interval</h4>
    <Annually />
    <Seasonally />
    <Monthly />
  </div>
)

const Body = (state) => {

  let currentState = getCurrentState(state)

  if (currentState.pageSelected === 'about') {
    return (
      <About />
    )
  }
  else if (currentState.pageSelected === 'links') {
    return (
      <Links />
    )
  }
  return (
    <div className="body">
      <Input />
      <Display />
    </div>
  )
}

export default connect(getCurrentState)(Body)
