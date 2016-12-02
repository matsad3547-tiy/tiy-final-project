import React, { Component } from 'react';
import './App.css';
// import {months} from './data/constants'
import USStateSelect from './containers/USStateSelect'
import Annually from './containers/Annually'
import Seasonally from './containers/Seasonally'
// import {Annually, Seasonally, Monthly, Daily} from './containers/timeInterval'
// import Annually from './containers/Annually'
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

const TimeIntervalSelect = () => (
  <div>
    <h3>Select a Time Interval</h3>
    <Annually />
    <Seasonally />
  </div>
)
// <Monthly />
// <Daily />

// const Annually = ({dispatch}) => {
//   // let input;
//   // const onSubmit = e => {
//   //   e.preventDefault()
//   //   if (!input.value.trim()) {
//   //     return
//   //   }
//   //   dispatch(changeUSState(input.value))
//   // }
//
//   return (
//   <form >
//     <button type="submit" value="annually">Annually</button>
//   </form>
// )}

// const Annually = () => (
//   <form >
//     <button type="submit" value="annually">Annually</button>
//   </form>
// )
//
// const Seasonally = () => (
//   <form className="select">
//     <button type="submit">Seasonally</button>
//     <select className="dropdown">
//       <option value="open">Select a Season</option>
//       <option key={'sp'} value="spring">Spring</option>
//       <option key={'su'} value="summer">Summer</option>
//       <option key={'fa'} value="fall">Fall</option>
//       <option key={'wi'} value="winter">Winter</option>
//     </select>
//   </form>
// )
//
// const Monthly = () => (
//   <form className="select">
//     <button type="submit" >Monthly</button>
//     <select className="dropdown">
//       <option value="open">Select a Month</option>
//       {months.map( (month, i) => <option key={i} value={month}>{month}</option>)}
//     </select>
//   </form>
// )
//
// const Daily = () => (
//   <form className="select">
//     <button type="submit">Daily</button>
//     <select className="dropdown">
//       <option value="today">Today</option>
//     </select>
//   </form>
// )
