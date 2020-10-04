const mergeSort = (array) => {
  if (array.length === 1) return array;

  //pointers
  let l, m, r;
  l = 0;
  m = array.length / 2;
  r = array.length;

  let arrayA = array.slice(l, m);
  let arrayB = array.slice(m, r);
  let newArray;

  arrayA = mergeSort(array.slice(0, m));
  arrayB = mergeSort(array.slice(m));

  newArray = merge(arrayA, arrayB);

  return newArray;
}

const merge = (arrayA, arrayB) => {
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