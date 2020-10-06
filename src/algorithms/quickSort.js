import { swap } from './helpers';

const quickSort = (array) => {
  if (array.length < 2) return array;
  swap(array, pickPivot(array), array.length - 1);

  let pivot = array[array.length - 1];
  let A = 0;
  let B = array.length - 1;

  // swap small value from right with big value from left
  while (A < B) {
    while (array[A] < pivot) A++;
    while (array[B] >= pivot) B--;
    if (A < B) swap(array, A, B);
  }

  // swap big value with pivot
  swap(array, A > B ? A : B, array.length - 1);

  // recurse on two halves
  let firstHalf = quickSort(array.slice(0, A));
  let secondHalf = quickSort(array.slice(A + 1));

  // put halves together
  array = firstHalf.concat(pivot, secondHalf);
  return array;
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