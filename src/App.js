import React from 'react';

// components
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Bar from './components/Bar';

// style
import './App.css';

// algorithms
import bubbleSort from './algorithms/bubbleSort';
import mergeSort from './algorithms/mergeSort';

class App extends React.Component {
  state = {
    array: [],
    arraySteps: [],
    algorithm: 'Bubble Sort',
    barCount: "8",
    delay: 100,
  }

  handleStart = () => {
    if (this.state.algorithm === 'Bubble Sort') {
      let arrayNew = bubbleSort(this.state.array);

      this.run(arrayNew);
    }
    if (this.state.algorithm === 'Merge Sort') {
      this.setState({
        array: mergeSort(this.state.array),
      });
    }
    if (this.state.algorithm === 'Quick Sort') {
      this.quickSort();
    }
  }

  run(array) {
    array.map((step, i) =>
      setTimeout(() => {
        this.setState({
          array: step,
        })
      }, this.state.delay * i)
    );
  }

  changeAlgorithm = (event) => {
    this.setState({
      algorithm: event.target.value,
    });
  };

  changeBarCount = (event) => {
    this.setState({
      barCount: event.target.value,
    })
    this.generateBars(event.target.value);
  }

  generateBars = (barCount) => {
    let barsTemp = [];
    for (let i = 0; i < barCount; i++) {
      barsTemp.push(Math.floor(Math.random() * 90) + 10)
    }
    this.setState({
      array: barsTemp,
    });
  }

  componentDidMount() {
    this.generateBars(this.state.barCount);
  }

  render() {
    let barsDiv = this.state.array.map((value, index) => <Bar key={index} length={value} />);

    return (
      <div className="App">
        <FormControl>
          <RadioGroup name="algorithms" value={this.state.algorithm} onChange={this.changeAlgorithm}>
            <FormControlLabel value="Bubble Sort" control={<Radio />} label="Bubble Sort" />
            <FormControlLabel value="Merge Sort" control={<Radio />} label="Merge Sort" />
            <FormControlLabel value="Quick Sort" control={<Radio />} label="Quick Sort" />
          </RadioGroup>

        </FormControl>

        <FormControl>
          <RadioGroup name="barcounts" value={this.state.barCount} onChange={this.changeBarCount}>
            <FormControlLabel value="8" control={<Radio />} label="8" />
            <FormControlLabel value="16" control={<Radio />} label="16" />
            <FormControlLabel value="32" control={<Radio />} label="32" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="secondary" onClick={() => this.generateBars()}>Reset</Button>
        <Button variant="contained" color="secondary" onClick={() => this.handleStart()}>Start</Button>
        <div className="container">
          {barsDiv}
        </div>
      </div>
    )
  }
}

export default App;
