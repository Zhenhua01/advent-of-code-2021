"use strict";

const { readData } = require("./readInputs");
const path = process.argv[2];


// AoC 2021 Day 7 Challenge

/** */
async function whales1(path) {
  let data = await readData(path);
  let positions = data[0].split(",").map(v => +v);
  let max = Math.max(...positions);
  let fuels = {};

  for (let i = 0; i <= max; i++) {
    let position = i.toString();
    let fuel = 0;

    if (!fuels[position]) {
      for (let j = 0; j < positions.length; j++) {
        fuel += Math.abs(positions[j] - i);
      }
    }

    fuels[position] = fuel;
  }

  const minFuel = Math.min(...Object.values(fuels));

  console.log("minFuel1", minFuel);
  return minFuel;
}

whales1(path);


/** */
async function whales2(path) {
  let data = await readData(path);
  let positions = data[0].split(",").map(v => +v);
  let max = Math.max(...positions);
  let fuels = {};

  for (let i = 0; i <= max; i++) {
    let position = i.toString();
    let fuel = 0;

    if (!fuels[position]) {
      for (let j = 0; j < positions.length; j++) {
        let distance = Math.abs(positions[j] - i);

        for (let k = 1; k <= distance; k++) {
          fuel += k;
        }
      }
    }

    fuels[position] = fuel;
  }

  const minFuel = Math.min(...Object.values(fuels));

  console.log("minFuel2", minFuel);
  return minFuel;
}

whales2(path);


// node 7_whales.js 7_input.txt