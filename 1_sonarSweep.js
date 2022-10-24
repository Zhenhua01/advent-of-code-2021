"use strict";

const { readData } = require("./readInputs");
const path = process.argv[2];

// example input arr = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
// example output = 7
// determine number of increases

/** Given a path to a text file with list of numbers in text file, returns the
 * number of times a value in the list is larger than the value before it.
 */
async function sonarSweep1(path) {
  const data = await readData(path);
  const arr = data.map(num => +num);
  let count = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) count++;
  }

  console.log("sonarSweep1:", count);
  return count;
}

sonarSweep1(path);


/** Given an array of numbers, a starting index, and a sliding window width,
 * returns the sum of the numbers from the starting index to the sliding
 * window width.
 */
function windowSum(arr, start, width) {
  let sum = 0;

  for (let i = start; i < start + width; i++) {
    sum += arr[i];
  }

  return sum;
}


// example input arr = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
// example output = 5
// sliding window measurement increases

/** Given a path to a text file with list of numbers in text file and a specific
 * sliding window width, returns the number of times the sum of a window width
 * is larger than the sum of the window with before it.
 */
async function sonarSweep2(path, width = 3) {
  const data = await readData(path);
  const arr = data.map(num => +num);

  let count = 0;
  let sumFirst = windowSum(arr, 0, width);
  let start = 1;

  while (start <= arr.length - width) {
    let sumSecond = windowSum(arr, start, width);
    if (sumSecond > sumFirst) count++;
    sumFirst = sumSecond;
    start++;
  }

  console.log("sonarSweep2:", count);
  return count;
}

sonarSweep2(path);


// node 1_sonarSweep.js 1_data.txt