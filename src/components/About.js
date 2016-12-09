import React from 'react';

const About = () => (
  <div className="body about">
    <h4>About this project</h4>
    <div>
      <p>The idea behind this project is to show a visual representation of the solar insolation resources available in each state.</p>
      <br/>
      <p>
        This project is still at an early phase, so there are some caveats to keep in mind:</p>
      <br/>
    </div>
      <div>
        <ul>
          <li>The solar data is taken from the geographic center of each state - solar insolation resources will vary significantly by latitude</li>
        </ul>
      </div>

  </div>
)

export default About
