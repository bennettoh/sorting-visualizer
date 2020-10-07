import React from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import Bar from './components/Bar';

// style
import './App.css';

// algorithms
import bubbleSort from './algorithms/bubbleSort';
import mergeSort from './algorithms/mergeSort';
import quickSort from './algorithms/quickSort';

class App extends React.Component {
  state = {
    array: [],
    timeouts: [],
    algorithm: 'Bubble Sort',
    barCount: 8,
    delay: 128,
    colorKey: [],
  }

  handleStart = () => {
    if (this.state.algorithm === 'Bubble Sort') {
      let [steps, colorSteps] = bubbleSort(this.state.array, this.state.colorKey);
      this.run(steps, colorSteps);
    }
    if (this.state.algorithm === 'Merge Sort') {
      let steps = [];
      let colorSteps = [];
      steps.push(this.state.array.slice());
      colorSteps.push(this.state.colorKey.slice());

      mergeSort(this.state.array, 0, steps, colorSteps);
      this.run(steps, colorSteps);
    }
    if (this.state.algorithm === 'Quick Sort') {
      let steps = [];
      let colorSteps = [];
      steps.push(this.state.array.slice());
      colorSteps.push(this.state.colorKey.slice());

      quickSort(this.state.array, 0, steps, colorSteps);
      this.run(steps, colorSteps);
    }
  }

  run(steps, colorSteps) {
    this.clearTimeouts();
    let timeouts = [];

    steps.map((step, i) => {
      let timeout = setTimeout(() => {
        this.setState({
          array: step,
          colorKey: colorSteps[i],
        })
      }, this.state.delay * i);
      timeouts.push(timeout);
    });

    this.setState({
      timeouts: timeouts,
    });
  }

  changeAlgorithm = (event) => {
    this.clearTimeouts();
    this.setState({
      algorithm: event.target.value,
    });
  };

  changeDelay = (event) => {
    this.clearTimeouts();
    this.setState({
      delay: parseInt(event.target.value),
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  generateBars = (barCount) => {
    this.clearTimeouts();

    barCount = parseInt(barCount);
    let barsTemp = [];
    let colorKey = new Array(barCount).fill(false);

    for (let i = 0; i < barCount; i++) {
      barsTemp.push(Math.floor(Math.random() * 90) + 10);
    }

    this.setState({
      array: barsTemp,
      barCount: barCount,
      colorKey: colorKey,
    });
  }

  componentDidMount() {
    this.generateBars(this.state.barCount);
  }

  render() {
    let barsDiv = this.state.array.map((value, index) => <Bar
      key={index}
      length={value}
      color={this.state.colorKey[index]}
    />);

    return (
      <div className="App">
        <FormControl>
          <FormLabel>Algorithm</FormLabel>
          <RadioGroup name="algorithms" value={this.state.algorithm} onChange={this.changeAlgorithm}>
            <FormControlLabel value="Bubble Sort" control={<Radio />} label="Bubble Sort" />
            <FormControlLabel value="Merge Sort" control={<Radio />} label="Merge Sort" />
            <FormControlLabel value="Quick Sort" control={<Radio />} label="Quick Sort" />
          </RadioGroup>

        </FormControl>

        <FormControl>
          <FormLabel>Array size</FormLabel>
          <RadioGroup name="barcounts" value={this.state.barCount} onChange={e => this.generateBars(e.target.value)}>
            <FormControlLabel value={8} control={<Radio />} label="8 items" />
            <FormControlLabel value={16} control={<Radio />} label="16 items" />
            <FormControlLabel value={32} control={<Radio />} label="32 items" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Speed</FormLabel>
          <RadioGroup name="delay" value={this.state.delay} onChange={this.changeDelay}>
            <FormControlLabel value={128} control={<Radio />} label="1x" />
            <FormControlLabel value={64} control={<Radio />} label="2x" />
            <FormControlLabel value={32} control={<Radio />} label="4x" />
          </RadioGroup>
        </FormControl>

        <div>
          <Button variant="contained" color="secondary" onClick={() => this.generateBars(this.state.barCount)}>Reset</Button>
          <Button variant="contained" color="secondary" onClick={() => this.handleStart()}>Start</Button>
        </div>
        <div className="container">
          {barsDiv}
        </div>
      </div>
    )
  }
}

export default App;
