import { insertStep } from './helpers';

function mergeSort(array, position, arraySteps, colorSteps) {
  if (array.length === 1) return array;
  let mid = Math.floor(array.length / 2);

  // Split and work recursively
  let arrayA = mergeSort(array.slice(0, mid), position, arraySteps, colorSteps);
  let arrayB = mergeSort(array.slice(mid), position + mid, arraySteps, colorSteps);

  return merge(arrayA, arrayB, position, arraySteps, colorSteps);
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
    updateColor(position, colorSteps, arrayNew.length - 1, [0], []);
  }

  // concatenate remaining values
  updateColor(position, colorSteps, arrayNew.length, arrayA, arrayB);
  if (arrayA.length !== 0) arrayNew = arrayNew.concat(arrayA);
  if (arrayB.length !== 0) arrayNew = arrayNew.concat(arrayB);
  insertStep(arrayNew, position, arraySteps);

  return arrayNew;
}

function updateColor(position, colorSteps, start, arrayA, arrayB) {
  if (position === 0) {
    // if sorted from the front, mark changed elements to be green
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    colorKey.fill(1, start, start + arrayA.length + arrayB.length);
    colorSteps.push(colorKey);
  } else {
    // or duplicate previous step
    colorSteps.push(colorSteps[colorSteps.length - 1].slice());
  }
}

export default mergeSort;