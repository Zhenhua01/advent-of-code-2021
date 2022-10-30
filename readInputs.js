"use strict";

const fsP = require("fs/promises");

async function readData(path) {
  try {
    const contents = await fsP.readFile(`./input_data/${path}`, "utf8");
    return contents.split('\n');

  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

module.exports = { readData };
