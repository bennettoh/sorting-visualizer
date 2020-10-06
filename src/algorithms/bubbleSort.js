import { swap } from './helpers';

const bubbleSort = (array) => {
  let arraySteps = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1);
      }
      arraySteps.push(array.slice());
    }
  }
  return arraySteps;
}

export default bubbleSort;