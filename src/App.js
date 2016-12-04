import React, { Component } from 'react';
import './App.css';
import USStateSelect from './containers/USStateSelect'
import Annually from './containers/Annually'
import Seasonally from './containers/Seasonally'
import Monthly from './containers/Monthly'
import Graph from './components/Graph'

// import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;

const Header = () => (
  <div className="App-header">
    <h2>Yeah, I rendered!!!</h2>
  </div>
)

const Body = () => (
  <div className="body">
    <Input />
    <Graph />
  </div>
)

const Footer = () => (
  <p className="footer">I'm a footer</p>
)

const Input = () => (
  <div className="input">
    <USStateSelect />
    <TimeIntervalSelect />
  </div>
)
//
// const Graph = () => {
//
//   const disp = (state) => {
//     return state.usState;
//   }
//   let currentUsState = disp(store.getState())
//
// return (
//   <div className="graph">
//     This is where the display goes
//     {currentUsState}
//   </div>
// )
// }

const TimeIntervalSelect = () => (
  <div>
    <h3>Select a Time Interval</h3>
    <Annually />
    <Seasonally />
    <Monthly />
  </div>
)
