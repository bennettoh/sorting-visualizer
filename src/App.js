import React from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
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
    arraySteps: [],
    algorithm: 'Bubble Sort',
    barCount: 16,
    delay: 100,
  }

  handleStart = () => {
    if (this.state.algorithm === 'Bubble Sort') {
      let arrayNew = bubbleSort(this.state.array);

      this.run(arrayNew);
    }
    if (this.state.algorithm === 'Merge Sort') {
      let arraySteps = [];

      this.setState({
        array: mergeSort(this.state.array, 0, arraySteps),
      });
    }
    if (this.state.algorithm === 'Quick Sort') {
      let array = [];
      quickSort(array);
      console.log(array);
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

  generateBars = (barCount) => {
    let barsTemp = [];
    for (let i = 0; i < barCount; i++) {
      barsTemp.push(Math.floor(Math.random() * 90) + 10);
    }
    this.setState({
      array: barsTemp,
      barCount: parseInt(barCount),
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
          <RadioGroup name="barcounts" value={this.state.barCount} onChange={e => this.generateBars(e.target.value)}>
            <FormControlLabel value={8} control={<Radio />} label="8" />
            <FormControlLabel value={16} control={<Radio />} label="16" />
            <FormControlLabel value={32} control={<Radio />} label="32" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="secondary" onClick={() => this.generateBars(16)}>Reset</Button>
        <Button variant="contained" color="secondary" onClick={() => this.handleStart()}>Start</Button>
        <div className="container">
          {barsDiv}
        </div>
      </div>
    )
  }
}

export default App;
