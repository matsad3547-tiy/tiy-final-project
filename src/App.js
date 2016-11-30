import React, { Component } from 'react';
// import stateInf from './stateInf';
// import logo from './logo.svg';
// import $ from 'jquery';
import './App.css';
import usStates from './data/usStates'
import months from './data/months'
// import Header from './components/Header'
// const usStates = getStates(stateInf)

console.log(months);


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
    <h2>Yeah, I fucking rendered!!!</h2>
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

const Graph = () => (
  <div className="graph">
    This is where the display goes
  </div>
)

// $(document).ready(function() {
//   $('.select').click(function(){
//     $('.selected').slideDown(400, function(){
//       $(this).click(function() {$('.selected').slideUp(400)});
//     });
//   });
// });

const USStateSelect = () => (
  <div className="select">
    <h3>Select a State</h3>
    <button className="select">Select a State</button>
    <select className="dropdown">
      <option value="open">States</option>
      {usStates.map( (usState, i) => <option key={i} value={usState}>{usState}</option>)}
    </select>
  </div>
)

const TimeIntervalSelect = () => (
  <div className="select">
    <h3>Select a Time Interval</h3>
    <button className="select">Yearly</button>
    <button className="select">Seasonally</button>
    <select className="dropdown">
      <option value="open">Select a Season</option>
      <option key={'sp'} value="spring">Spring</option>
      <option key={'su'} value="summer">Summer</option>
      <option key={'fa'} value="fall">Fall</option>
      <option key={'wi'} value="winter">Winter</option>
    </select>
    <button className="select">Monthly</button>
    <select className="dropdown">
      <option value="open">Select a Month</option>
      {months.map( (month, i) => <option key={i} value={month}>{month}</option>)}
    </select>
    <button className="select">Daily</button>
    <select className="dropdown">
      <option value="today">Today</option>
    </select>
  </div>
)

// const TimeIntervalSelect = () => (
//   <div className="select">
//     Select a time interval
//   </div>
// )

// <img src={logo} className="App-logo" alt="logo" />
