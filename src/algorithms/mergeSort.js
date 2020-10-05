function mergeSort(array, position, arraySteps) {
  if (array.length === 1) return array;

  let mid = array.length / 2;

  let arrayA = mergeSort(array.slice(0, mid), position, arraySteps);
  let arrayB = mergeSort(array.slice(mid), position + mid, arraySteps);

  return merge(arrayA, arrayB, position, arraySteps);
}

const merge = (arrayA, arrayB, position, arraySteps) => {
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
  }
  if (arrayA.length !== 0) arrayNew = arrayNew.concat(arrayA);
  if (arrayB.length !== 0) arrayNew = arrayNew.concat(arrayB);
  insertStep(arrayNew, position, arraySteps);

  return arrayNew;
}

const insertStep = (arrayNew, position, arraySteps) => {
  let currentStep = arraySteps[arraySteps.length - 1].slice();
  currentStep.splice(position, arrayNew.length, ...arrayNew);
  arraySteps.push(currentStep);
}

export default mergeSort;