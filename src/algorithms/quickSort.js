import { swap, insertStep } from './helpers';

const quickSort = (array, position, arraySteps) => {
  if (array.length < 2) return;

  // pick median of three numbers as pivot and sent it to back
  swap(array, pickPivot(array), array.length - 1);
  insertStep(array, position, arraySteps);

  let pivot = array[array.length - 1];
  let A = 0;
  let B = array.length - 1;

  // swap small value from right with big value from left
  while (A < B) {
    while (array[A] < pivot) A++;
    while (array[B] >= pivot) B--;
    if (A < B) {
      swap(array, A, B);
      insertStep(array, position, arraySteps);
    }
  }

  // swap big value with pivot
  swap(array, A > B ? A : B, array.length - 1);
  insertStep(array, position, arraySteps);

  // recurse on two halves
  quickSort(array.slice(0, A), position, arraySteps);
  quickSort(array.slice(A + 1), position + A + 1, arraySteps);
  return;
}

function pickPivot(array) {
  let A = array[0];
  let B = array[Math.floor(array.length / 2)];
  let C = array[array.length - 1];

  let middleValue = [A, B, C].sort()[1];
  let middleIndex = array.indexOf(middleValue);

  return middleIndex;
}

export default quickSort;