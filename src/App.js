import React, { Component } from 'react';
import './App.css';
import usStates from './data/usStates'
import months from './data/months'
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

// onSubmit={e => {
//     e.preventDefault()
//     if (!input.value.trim()) {
//       return
//     }
//     dispatch(addTodo(input.value))
//     input.value = ''
//   }}

const USStateSelect = () => (
  <div className="select">
    <form >
      <h3>Select a State</h3>
      <button type="submit" className="select">Select a State</button>
      <select className="dropdown">
        <option value="open">States</option>
        {usStates.map( (usState, i) => <option key={i} value={usState}>{usState}</option>)}
      </select>
    </form>
  </div>
)

const TimeIntervalSelect = () => (
  <div>
    <h3>Select a Time Interval</h3>
    <Annually />
    <Seasonally />
    <Monthly />
    <Daily />
  </div>
)

const Annually = () => (
  <form className="select">
    <button type="submit">Annually</button>
  </form>
)

const Seasonally = () => (
  <form className="select">
    <button type="submit">Seasonally</button>
    <select className="dropdown">
      <option value="open">Select a Season</option>
      <option key={'sp'} value="spring">Spring</option>
      <option key={'su'} value="summer">Summer</option>
      <option key={'fa'} value="fall">Fall</option>
      <option key={'wi'} value="winter">Winter</option>
    </select>
  </form>
)

const Monthly = () => (
  <form className="select">
    <button type="submit" >Monthly</button>
    <select className="dropdown">
      <option value="open">Select a Month</option>
      {months.map( (month, i) => <option key={i} value={month}>{month}</option>)}
    </select>
  </form>
)

const Daily = () => (
  <form className="select">
    <button type="submit">Daily</button>
    <select className="dropdown">
      <option value="today">Today</option>
    </select>
  </form>
)
