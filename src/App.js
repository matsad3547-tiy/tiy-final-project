import React, { Component } from 'react';
// import stateInf from './stateInf';
// import logo from './logo.svg';
// import $ from 'jquery';
import './App.css';
import usStates from './functions/getStates'
// import Header from './components/Header'
// const usStates = getStates(stateInf)


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
    <h3><a className="select">Select a State</a></h3>
    <ul className="selected">
      {usStates.map( (usState, i) => <li key={i} id={usState}>{usState}</li>)}
    </ul>
  </div>
)

const TimeIntervalSelect = () => (
  <div className="select">
    Select a time interval
  </div>
)

// <img src={logo} className="App-logo" alt="logo" />
