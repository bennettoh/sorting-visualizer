import React from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import Bar from './components/Bar';

import './App.css';

class App extends React.Component {
  state = {
    array: [37, 97, 72, 81, 56, 28, 77, 71, 31, 45, 27, 46, 45, 69, 73, 43, 67, 38, 43, 86, 95, 44, 85, 84, 54, 69, 90, 57, 20, 35],
    algorithm: 'Bubble Sort'
  }

  handleSwap = () => {
    this.setState({
      array: swap(this.state.array, 0, 2),
    })
  }

  handleChange = (event) => {
    this.setState({
      algorithm: event.target.value,
    });
  };

  generateBars = () => {
    let barsTemp = [];
    for (let i = 0; i < 30; i++) {
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
        <FormControl>
          <RadioGroup aria-label="gender" name="algorithms" value={this.state.algorithm} onChange={this.handleChange}>
            <FormControlLabel value="Bubble Sort" control={<Radio />} label="Bubble Sort" />
            <FormControlLabel value="Merge Sort" control={<Radio />} label="Merge Sort" />
            <FormControlLabel value="Quick Sort" control={<Radio />} label="Quick Sort" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="secondary" onClick={() => this.generateBars()}>Reset</Button>
        <Button variant="contained" color="secondary" onClick={() => this.handleSwap()}>Start</Button>
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
