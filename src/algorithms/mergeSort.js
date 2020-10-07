import { insertStep } from './helpers';

function mergeSort(array, position, arraySteps, colorSteps) {
  if (array.length === 1) return array;

  let mid = array.length / 2;

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

    if (position === 0) {
      let colorKey = colorSteps[colorSteps.length - 1].slice();
      colorKey[arrayNew.length - 1] = true;
      colorSteps.push(colorKey);
    } else {
      colorSteps.push(colorSteps[colorSteps.length - 1].slice());
    }
  }

  if (position === 0) {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    colorKey.fill(true, position + arrayNew.length, position + arrayNew.length + arrayA.length + arrayB.length);
    colorSteps.push(colorKey);
  } else {
    colorSteps.push(colorSteps[colorSteps.length - 1].slice());
  }

  if (arrayA.length !== 0) arrayNew = arrayNew.concat(arrayA);
  if (arrayB.length !== 0) arrayNew = arrayNew.concat(arrayB);

  insertStep(arrayNew, position, arraySteps);

  return arrayNew;
}

export default mergeSort;