
export function swap(array, indexA, indexB) {
  let temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
  return array;
}

export function insertStep(arrayNew, position, arraySteps) {
  let currentStep = arraySteps[arraySteps.length - 1].slice();
  currentStep.splice(position, arrayNew.length, ...arrayNew);
  arraySteps.push(currentStep);
}