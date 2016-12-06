import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Body from './components/Body'

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

const Footer = () => (
  <p className="footer">check out the code to this project at <a href="https://github.com/matsad3547-tiy/tiy-final-project"target="blank">github</a></p>
)
