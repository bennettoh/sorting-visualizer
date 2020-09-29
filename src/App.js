import React from 'react';
import { useState } from 'react';

import Bar from './components/Bar';

import './App.css';

function generateBars() {
  let barsTemp = [];
  for (let i = 0; i < 10; i++) {
    barsTemp.push(Math.floor(Math.random() * 80) + 20)
  }
  return barsTemp
}

function App() {
  let bars = generateBars();
  let barsDiv = bars.map((value, index) => (<Bar key={index} length={value} />));

  return (
    <div className="App">
      <form onSubmit={generateBars}>
        <input type="submit" value="Generate new bars"></input>
      </form>
      <div className="container">
        {barsDiv}
      </div>
    </div>
  );
}

export default App;
