const quickSort = (array, steps, i) => {
  // if (array.length === 1) return;
  // let mid = array.length / 2;

  // steps.push(array);
  // if (i > 0) quickSort(array.slice(0, mid), steps, --i);
  let arrayNew = [1, 2, 3];
  const copy = array.slice();
  console.log(copy);
  copy.splice(0, arrayNew.length, ...arrayNew);
  console.log(copy);
}

export default quickSort;