import React from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import Bar from './components/Bar';

import './App.css';

class App extends React.Component {
  state = {
    array: [],
    algorithm: 'Bubble Sort'
  }

  handleStart = () => {
    if (this.state.algorithm === 'Bubble Sort') {
      this.bubbleSort(0, this.state.array.length - 1);
    }
    if (this.state.algorithm === 'Merge Sort') {
      this.setState({
        array: this.mergeSortRecursive(this.state.array),
      });
    }
    if (this.state.algorithm === 'Quick Sort') {
      this.quickSort();
    }
  }

  recursionTest(counter) {
    if (counter === 20) return;
    this.recursionTest(++counter);

    setTimeout(() => {
      console.log(counter);
    }, (20 - counter) * 100);
  }

  bubbleSort(i, length) {
    setTimeout(() => {
      if (this.state.array[i % length] > this.state.array[(i % length) + 1]) this.handleSwap(i % length, i % length + 1);
      if (i < length * length) this.bubbleSort(++i, length);
    }, 10);
  }

  mergeSort(array, depth) {
    if (array.length === 1) return array;

    //pointers
    let l, m, r;
    l = 0;
    m = array.length / 2;
    r = array.length;

    let arrayA = array.slice(l, m);
    let arrayB = array.slice(m, r);
    let newArray;

    arrayA = this.mergeSort(array.slice(0, m), ++depth);
    arrayB = this.mergeSort(array.slice(m), ++depth);

    setTimeout(() => {
      console.log('%ccurrent depth: ' + depth, "color: red");
      console.log('input array ' + arrayA + arrayB);

      newArray = this.merge(arrayA, arrayB);

      this.setState({
        array: newArray,
      });

      return newArray;
    }, (10 - depth) * 100);
  }

  merge(arrayA, arrayB) {
    let arrayNew = [];
    let A = 0;
    let B = 0;

    while (arrayA.length > 0 && arrayB.length > 0) {
      if (arrayA[A] < arrayB[B]) {
        arrayNew.push(arrayA.shift());
      } else {
        arrayNew.push(arrayB.shift());
      }
    }
    if (arrayA.length !== 0) arrayNew = arrayNew.concat(arrayA);
    if (arrayB.length !== 0) arrayNew = arrayNew.concat(arrayB);

    console.log('final array ' + arrayNew);


    return arrayNew;
  }

  mergeSortRecursive(array) {
    if (array.length === 1) return array;

    let middle = array.length / 2;
    let arrayA, arrayB, arrayNew = [];

    // pointers
    let A = 0;
    let B = 0;

    arrayA = this.mergeSortRecursive(array.slice(0, middle));
    arrayB = this.mergeSortRecursive(array.slice(middle, array.length));

    while (A < arrayA.length && B < arrayB.length) {

      if (arrayA[A] > arrayB[B]) {
        arrayNew = arrayNew.concat(arrayB[B++]);
      } else {
        arrayNew = arrayNew.concat(arrayA[A++]);
      }
    }

    if (A < arrayA.length) arrayNew = arrayNew.concat(arrayA.slice(A));
    if (B < arrayB.length) arrayNew = arrayNew.concat(arrayB.slice(B));

    this.setState({
      array: arrayNew,
    })

    return arrayNew;
  }

  handleSwap = (indexA, indexB) => {
    this.setState({
      array: swap(this.state.array, indexA, indexB),
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
      barsTemp.push(Math.floor(Math.random() * 90) + 10)
    }
    this.setState({
      array: barsTemp,
    });
    console.log('=== new bars ===');

    console.log(barsTemp);
  }

  componentDidMount() {
    this.generateBars();
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
        <Button variant="contained" color="secondary" onClick={() => this.handleStart()}>Start</Button>
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
