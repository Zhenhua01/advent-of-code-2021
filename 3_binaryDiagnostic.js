"use strict";

const { readData } = require("./readInputs");
const path = process.argv[2];

// example input arr = [
//            'forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']
// example output = 15 horizontal x 10 depth = 150 position
// determine final position

/** Given a path to a text file with a list of information in binary bits,
 * determines the most common bit and least common bit in each position to
 * represent the gamma rate and epsilon rate, respectively. Returns the power
 * consumption of submarine equal to gamma rate multiplied by epsilon rate.
 */
async function binaryDiagnostic(path) {
  const data = await readData(path);
  let rowLength = data[0].length;
  let frequency = {};

  for (let row of data) {
    for (let i = 0; i < rowLength; i++) {
      let key = i.toString();
      if (!frequency[key]) frequency[key] = {};
      frequency[key][row[i]] = (frequency[key][row[i]] + 1) || 1;
    }
  }

  let gammaRate = "";
  let epsilonRate = "";

  for (let key in frequency) {
    if (frequency[key]['0'] > frequency[key]['1']) {
      gammaRate += '0';
      epsilonRate += '1';
    } else {
      gammaRate += '1';
      epsilonRate += '0';
    }
  }

  let gammaRateDigit = parseInt(gammaRate, 2);
  let epsilonRateDigit = parseInt(epsilonRate, 2);
  const powerConsumption = gammaRateDigit * epsilonRateDigit;

  // console.log("frequency", frequency);
  // console.log("gammaRate", gammaRate);
  // console.log("epsilonRate", epsilonRate);
  console.log("gammaRateDigit", gammaRateDigit);
  console.log("epsilonRateDigit", epsilonRateDigit);
  console.log("powerConsumption", powerConsumption);

  return powerConsumption;
}

binaryDiagnostic(path);


/** Returns a filtered array of rows that contain the most common digit at the
 * specified index.
 */
function mostCommonBit(arr, idx) {
  let index = idx.toString();
  let freq = {};

  for (let row of arr) {
    freq[row[index]] = (freq[row[index]] + 1) || 1;
  }
  const mostCommon = freq['0'] > freq['1'] ? '0' : '1';

  let filteredArr = arr.filter(row => row[index] === mostCommon);

  return filteredArr;
}

/** Returns a filtered array of rows that contain the least common digit at the
 * specified index.
 */
function leastCommonBit(arr, idx) {
  let index = idx.toString();
  let freq = {};

  for (let row of arr) {
    freq[row[index]] = (freq[row[index]] + 1) || 1;
  }
  const leastCommon = freq['0'] <= freq['1'] ? '0' : '1';

  let filteredArr = arr.filter(row => row[index] === leastCommon);

  return filteredArr;
}


/** Given a path to a text file with a list of information in binary bits.
 * Determines the oxygen generator rating by filtering rows for the most
 * common value in the current bit position down to one row. Determines the
 * the co2 scrubbing rating by filtering rows for the least common value in the
 * current bit position down to one row. Returns the life support rating equal
 * to oxygen generator rating multiplied by co2 scrubbing rating.
 */
async function lifeSupport(path) {
  const data = await readData(path);

  let oxygenGen = data;
  let CO2Scrub = data;

  let idx = 0;
  while (oxygenGen.length > 1) {
    oxygenGen = mostCommonBit(oxygenGen, idx);
    idx++;
  }

  idx = 0;
  while (CO2Scrub.length > 1) {
    CO2Scrub = leastCommonBit(CO2Scrub, idx);
    idx++;
  }

  let oxygenGenRating = parseInt(oxygenGen, 2);
  let CO2ScrubRating = parseInt(CO2Scrub, 2);
  const lifeSupportRating = oxygenGenRating * CO2ScrubRating;

  // console.log("oxygenGen", oxygenGen);
  // console.log("CO2Scrub", CO2Scrub);
  console.log("oxygenGenRating", oxygenGenRating);
  console.log("CO2ScrubRating", CO2ScrubRating);
  console.log("lifeSupportRating", lifeSupportRating);

  return lifeSupportRating;
}

lifeSupport(path);


// node 3_binaryDiagnostic.js 3_input.txt