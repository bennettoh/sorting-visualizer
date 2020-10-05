const mergeSort = (array, position, arraySteps) => {
  if (array.length === 1) return array;
  let mid = array.length / 2;
  let arrayNew;

  let arrayA = mergeSort(array.slice(0, mid), position, arraySteps);
  let arrayB = mergeSort(array.slice(mid), mid, arraySteps);

  arrayNew = merge(arrayA, arrayB, position, arraySteps);

  return arrayNew;
}

const merge = (arrayA, arrayB, position, arraySteps) => {
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

  return arrayNew;
}

export default mergeSort;