import React from 'react';

const About = () => (
  <div className="body">
    <h4>About this project</h4>
    <p>The idea behind this project is to show a visual representation of the solar insolation resources available in each state</p>
    <p>
      This project is still at an early phase, so there are some caveats to keep in mind:
      <ul>
        <li>The solar data is taken from the geographic center of each state - solar insolation resources will vary significantly by latitude</li>
      </ul>
    </p>
  </div>
)

export default About
