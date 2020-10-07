import React from 'react';
import { Button } from '@material-ui/core';
import Bar from './components/Bar';
import Form from './components/Form';

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

  ALGO_SET = {
    'Bubble Sort': bubbleSort,
    'Merge Sort': mergeSort,
    'Quick Sort': quickSort,
  }

  componentDidMount() {
    this.generateBars(this.state.barCount);
  }

  handleStart = () => {
    let array = this.state.array.slice();
    let steps = [this.state.array.slice()];
    let colorSteps = [this.state.colorKey.slice()];

    this.ALGO_SET[this.state.algorithm](array, 0, steps, colorSteps);

    this.run(steps, colorSteps);
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
    this.clearColorKey();
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

  clearColorKey = () => {
    this.setState({ colorKey: new Array(this.state.barCount).fill(false) });
  }

  generateBars = (barCount) => {
    this.clearTimeouts();
    this.clearColorKey();

    barCount = parseInt(barCount);
    let barsTemp = [];

    for (let i = 0; i < barCount; i++) {
      barsTemp.push(Math.floor(Math.random() * 90) + 10);
    }

    this.setState({
      array: barsTemp,
      barCount: barCount,
    });
  }

  render() {
    let barsDiv = this.state.array.map((value, index) => <Bar
      key={index}
      length={value}
      color={this.state.colorKey[index]}
    />);

    return (
      <div className="App">
        <Form
          formLabel="Algorithm"
          values={['Bubble Sort', 'Merge Sort', 'Quick Sort']}
          labels={['Bubble Sort', 'Merge Sort', 'Quick Sort']}
          currentValue={this.state.algorithm}
          onChange={this.changeAlgorithm}
        />

        <Form
          formLabel="Array size"
          values={[8, 16, 32]}
          labels={['8 items', '16 items', '32 items']}
          currentValue={this.state.barCount}
          onChange={e => this.generateBars(e.target.value)}
        />

        <Form
          formLabel="Speed"
          values={[128, 64, 32]}
          labels={['1x', '2x', '4x']}
          currentValue={this.state.delay}
          onChange={this.changeDelay}
        />

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.generateBars(this.state.barCount)}
          >Reset</Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.handleStart()}
          >Start</Button>
        </div>
        <div className="container">
          {barsDiv}
        </div>
      </div>
    )
  }
}

export default App;
