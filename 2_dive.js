"use strict";

const { readData } = require("./readInputs");
const path = process.argv[2];

// example input arr = [
//            'forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']
// example output = 15 horizontal x 10 depth = 150 position
// determine final position

/** Given a path to a text file with a list of directional commands in text file,
 * determines the final horizontal position and depth of the submarine.
 * Function returns the result of the horizontal position multiply by the depth.
 */
async function position1(path) {
  const data = await readData(path);
  let horiz = 0;
  let depth = 0;

  for (let direction of data) {
    let [command, value] = direction.split(" ");

    switch (command) {
      case "forward":
        horiz += +value;
        break;

      case "down":
        depth += +value;
        break;

      case "up":
        depth -= +value;
        break;
    }
  }

  console.log("horizontal1:", horiz);
  console.log("depth1:", depth);
  console.log("position1:", horiz * depth);
  return (horiz * depth);
}

position1(path);


/** */
async function position2(path) {
  const data = await readData(path);
  // const data = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];
  let horiz = 0;
  let depth = 0;
  let aim = 0;

  for (let direction of data) {
    let [command, value] = direction.split(" ");

    switch (command) {
      case "forward":
        horiz += +value;
        depth += (+aim * +value);
        break;

      case "down":
        aim += +value;
        break;

      case "up":
        aim -= +value;
        break;
    }
  }

  console.log("horizontal2:", horiz);
  console.log("depth2:", depth);
  console.log("aim:2", aim);
  console.log("position2:", horiz * depth);
  return (horiz * depth);
}

position2(path);


// node 2_dive.js 2_input.txt