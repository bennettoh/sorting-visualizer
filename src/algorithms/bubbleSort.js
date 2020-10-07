import { swap } from './helpers';

const bubbleSort = (array, position, arraySteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1);
      }
      arraySteps.push(array.slice());
      colorSteps.push(colorKey.slice());

    }
    colorKey[array.length - 1 - i] = true;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }

  // Remaining bars become green
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(true);
  return;
}

export default bubbleSort;