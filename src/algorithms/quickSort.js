import { swap } from './helpers';

const quickSort = (array) => {
  if (array.length < 2) return array;

  let arrayNew = array.slice();
  console.log('%coriginal array: ' + arrayNew, "color:red;");
  swap(arrayNew, pickPivot(arrayNew), arrayNew.length - 1);

  let pivot = arrayNew[arrayNew.length - 1];
  let A = 0;
  let B = arrayNew.length - 1;

  console.log('pivot: ' + pivot);
  console.log('new array: ' + arrayNew);


  // swap small with big values in order
  while (A < B) {
    while (arrayNew[A] < pivot) A++;
    ;
    while (arrayNew[B] >= pivot) B--;
    ;
    console.log('large val on left: ' + arrayNew[A]);
    console.log('small val on right: ' + arrayNew[B]);
    // swap and move on
    if (A < B) swap(arrayNew, A, B);
    console.log('new array: ' + arrayNew);
  }

  // swap big value with pivot
  console.log(`final swap indices: ${A} vs ${B}`);

  swap(arrayNew, A > B ? A : B, arrayNew.length - 1);
  console.log('final swap result: ' + arrayNew);

  // recursive
  let firstHalf = quickSort(arrayNew.slice(0, A));
  let secondHalf = quickSort(arrayNew.slice(A + 1));

  // put halves together
  arrayNew = firstHalf.concat(pivot, secondHalf);
  return arrayNew;
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