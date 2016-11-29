import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


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
  <p className="App-intro">
    This is going to be the body of my app
  </p>
)

const Footer = () => (
  <p className="footer">I'm a footer</p>
)

// <img src={logo} className="App-logo" alt="logo" />
