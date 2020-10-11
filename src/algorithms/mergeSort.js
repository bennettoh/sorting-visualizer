import { insertStep } from './helpers';

function mergeSort(array, position, arraySteps, colorSteps) {
  if (array.length === 1) return array;
  let mid = Math.floor(array.length / 2);

  // Split and work recursively
  let arrayA = mergeSort(array.slice(0, mid), position, arraySteps, colorSteps);
  let arrayB = mergeSort(array.slice(mid), position + mid, arraySteps, colorSteps);

  let arrayNew = merge(arrayA, arrayB, position, arraySteps, colorSteps);
  arraySteps.push(arraySteps[arraySteps.length - 1].slice());
  colorSteps.push(colorSteps[colorSteps.length - 1].fill(arrayNew.length === arraySteps[0].length ? 2 : 0));
  return arrayNew;
}

const merge = (arrayA, arrayB, position, arraySteps, colorSteps) => {
  let arrayNew = [];
  let A = 0;
  let B = 0;

  while (arrayA.length > 0 && arrayB.length > 0) {
    if (arrayA[A] < arrayB[B]) {
      arrayNew.push(arrayA.shift());
      insertStep(arrayNew, position, arraySteps);
    } else {
      arrayNew.push(arrayB.shift());
      insertStep(arrayNew, position, arraySteps);
    }
    updateColor(position, colorSteps, arrayNew.length - 1, [], []);
  }

  // concatenate remaining values

  if (arrayA.length !== 0 || arrayB.length !== 0) {
    updateColor(position, colorSteps, arrayNew.length, arrayA, arrayB);
    arrayNew = arrayNew.concat(arrayA);
    arrayNew = arrayNew.concat(arrayB)
    insertStep(arrayNew, position, arraySteps);
  }

  return arrayNew;
}

function updateColor(position, colorSteps, start, arrayA, arrayB) {
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  let end = position + start + arrayA.length + arrayB.length;
  start = start + position;

  if (end === start) {
    colorKey.fill(1, start, end + 1);
  } else {
    colorKey.fill(1, start, end);
  }
  colorSteps.push(colorKey);
}

export default mergeSort;