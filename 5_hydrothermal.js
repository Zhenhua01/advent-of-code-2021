"use strict";

const { readData } = require("./readInputs");
const path = process.argv[2];


// AoC 2021 Day 5 Challenge

/** */
async function hydrothermal1(path) {
  const data = await readData(path);
  let frequency = {};
  let count = 0;

  for (let row of data) {
    let [coord1, coord2] = row.split(" -> ");
    let [x1, y1] = coord1.split(",");
    let [x2, y2] = coord2.split(",");

    if (x1 === x2) {
      let start;
      let end;

      if (+y1 < +y2) {
        start = +y1;
        end = +y2;
      } else {
        start = +y2;
        end = +y1;
      }

      for (let i = start; i <= end; i++) {
        let coordinate = `${x1},${i}`;
        frequency[coordinate] = (frequency[coordinate] + 1) || 1;
      }

    } else if (y1 === y2) {
      let start;
      let end;

      if (+x1 < +x2) {
        start = +x1;
        end = +x2;
      } else {
        start = +x2;
        end = +x1;
      }

      for (let i = start; i <= end; i++) {
        let coordinate = `${i},${y1}`;
        frequency[coordinate] = (frequency[coordinate] + 1) || 1;
      }
    }
  }

  for (let key in frequency) {
    if (frequency[key] >= 2) count++;
  }

  console.log("count1", count);
  return count;
}

hydrothermal1(path);


/** */
async function hydrothermal2(path) {
  const data = await readData(path);
  let frequency = {};
  let count = 0;

  for (let row of data) {
    let [coord1, coord2] = row.split(" -> ");
    let [x1, y1] = coord1.split(",");
    let [x2, y2] = coord2.split(",");
    let start;
    let end;

    if (x1 === x2) {
      if (+y1 < +y2) {
        start = +y1;
        end = +y2;
      } else {
        start = +y2;
        end = +y1;
      }

      for (let i = start; i <= end; i++) {
        let coordinate = `${x1},${i}`;
        frequency[coordinate] = (frequency[coordinate] + 1) || 1;
      }

    } else if (y1 === y2) {
      if (+x1 < +x2) {
        start = +x1;
        end = +x2;
      } else {
        start = +x2;
        end = +x1;
      }

      for (let i = start; i <= end; i++) {
        let coordinate = `${i},${y1}`;
        frequency[coordinate] = (frequency[coordinate] + 1) || 1;
      }

    } else if (+x1 < +x2 && +y1 < +y2) {
      for (let i = 0; i <= (+x2 - +x1); i++) {
        let coordinate = `${+x1 + i},${+y1 + i}`;
        frequency[coordinate] = (frequency[coordinate] + 1) || 1;
      }

    } else if (+x1 < +x2 && +y2 < +y1) {
      for (let i = 0; i <= (+x2 - +x1); i++) {
        let coordinate = `${+x1 + i},${+y1 - i}`;
        frequency[coordinate] = (frequency[coordinate] + 1) || 1;
      }

    } else if (+x2 < +x1 && +y1 < +y2) {
      for (let i = 0; i <= (+x1 - +x2); i++) {
        let coordinate = `${+x1 - i},${+y1 + i}`;
        frequency[coordinate] = (frequency[coordinate] + 1) || 1;
      }

    } else if (+x2 < +x1 && +y2 < +y1) {
      for (let i = 0; i <= (+x1 - +x2); i++) {
        let coordinate = `${+x1 - i},${+y1 - i}`;
        frequency[coordinate] = (frequency[coordinate] + 1) || 1;
      }
    }
  }

  for (let key in frequency) {
    if (frequency[key] >= 2) count++;
  }

  console.log("count2", count);
  return count;
}

hydrothermal2(path);


// node 5_hydrothermal.js 5_input.txt