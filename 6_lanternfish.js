"use strict";

const { readData } = require("./readInputs");
const path = process.argv[2];


// AoC 2021 Day 6 Challenge

/** */
async function laternfish1(path) {
  let data = await readData(path);
  let state = data[0].split(",").map(v => +v);
  const days = 80;

  for (let i = 0; i < days; i++) {
    let length = state.length;

    for (let j = 0; j < length; j++) {
      if (state[j] === 0) {
        state[j] = 6;
        state.push(8);
      } else {
        state[j] = state[j] - 1;
      }
    }
  }

  // console.log("state1", state);
  console.log("fishcount1", state.length);
  return state.length;
}

laternfish1(path);


// optimized the above with frequency object counter b/c array size limits
/** */
async function laternfish2(path) {
  let data = await readData(path);
  let state = data[0].split(",");
  const days = 256;

  let frequency = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
  };

  for (let val of state) {
    frequency[val] = frequency[val] + 1;
  }

  for (let i = 0; i < days; i++) {
    let newFishCount = frequency["0"];

    frequency["0"] = frequency["1"];
    frequency["1"] = frequency["2"];
    frequency["2"] = frequency["3"];
    frequency["3"] = frequency["4"];
    frequency["4"] = frequency["5"];
    frequency["5"] = frequency["6"];
    frequency["6"] = frequency["7"] + newFishCount;
    frequency["7"] = frequency["8"];
    frequency["8"] = newFishCount;
  }

  const counts = Object.values(frequency);
  let count = 0;

  for (let val of counts) {
    count += val;
  }

  // console.log("frequency", frequency);
  console.log("fishcount2", count);
  return count;
}

laternfish2(path);


// node 6_lanternfish.js 6_input.txt