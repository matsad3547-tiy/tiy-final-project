import React from 'react';

const About = () => (
  <div className="body about">
    <h3>About this project</h3>
    <div>
      <p>The idea behind this project is to show a visual representation of the solar insolation resources available in each state.</p>
      <br/>
      <p>
        This project is still in a very early phase, so here are some caveats to keep in mind:</p>
      <br/>
    </div>
      <div>
        <ul>
          <li>This project may be expanded to include a variety of other information</li>
          <li>The solar data is taken from the geographic center of each state - solar insolation resources will vary significantly by latitude and a variety of other factors</li>
        </ul>
      </div>

  </div>
)

export default About
