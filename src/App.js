import React from 'react';
import { useState } from 'react';

import Bar from './components/Bar';

import './App.css';

class App extends React.Component {
  state = {
    array: [],
  }

  handleSwap = () => {
    this.setState({
      array: swap(this.state.array, 0, 2),
    })
  }

  generateBars = () => {
    let barsTemp = [];
    for (let i = 0; i < 10; i++) {
      barsTemp.push(Math.floor(Math.random() * 80) + 20)
    }
    this.setState({
      array: barsTemp,
    })
  }

  render() {
    let barsDiv = this.state.array.map((value, index) => <Bar key={index} length={value} />);

    return (
      <div className="App">
        <button onClick={() => this.handleSwap()}>Swap</button>
        <button onClick={() => this.generateBars()}>Generate</button>
        <div className="container">
          {barsDiv}
        </div>
      </div>
    )
  }
}

function swap(array, indexA, indexB) {
  let temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
  return array;
}

export default App;
