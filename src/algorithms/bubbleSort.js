import { swap } from './helpers';

const bubbleSort = (array) => {
  let arraySteps = [];
  let colorSteps = [];
  let barStatus = new Array(array.length).fill(false);

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1);
      }
      arraySteps.push(array.slice());
      colorSteps.push(barStatus.slice());

    }
    barStatus[array.length - 1 - i] = true;
  }

  // Remaining bars become green
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(true);
  return [arraySteps, colorSteps];
}

export default bubbleSort;