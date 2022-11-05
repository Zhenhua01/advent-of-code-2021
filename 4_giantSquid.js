"use strict";

const { readData } = require("./readInputs");
const path = process.argv[2];

// example input arr =
// example output =
// determine final position

/** Given a path to a text file
 */
async function bingo1(path) {
  const data = await readData(path);
  let bingoDraws = data[0].split(",");
  let gameBoards = getGameBoards(data);
  let winningBoard = [];
  let winningDraw = false;

  for (let draw of bingoDraws) {
    if (!winningDraw) {
      for (let i = 0; i < gameBoards.length; i++) {
        gameBoards[i] = checkBoard(gameBoards[i], +draw);

        if (checkWin(gameBoards[i])) {
          winningBoard = gameBoards[i];
          winningDraw = draw;
          break;
        }
      }
    }
  }

  let score = scoreBoard(winningBoard);
  let product = (score * winningDraw);
  // console.log("winningBoard", winningBoard);
  console.log("scoreBoard", score);
  console.log("winningDraw", winningDraw);
  console.log("product", product);

  return product;
}

bingo1(path);


/** */
function checkBoard(board, draw) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === draw) board[i][j] = "0";
    }
  }

  return board;
}

/** */
function getGameBoards(data) {
  let gameBoards = [];
  for (let i = 2; i < data.length; i += 6) {
    let board = [];
    for (let j = i; j < i + 5; j++) {
      let filtered = data[j].split(" ").filter(v => v.length > 0);
      filtered = filtered.map(v => +v);
      board.push(filtered);
    }
    gameBoards.push(board);
  }

  return gameBoards;
}

/** */
function checkWin(board) {
  for (let row of board) {
    if (row.filter(v => v === "0").length === 5) return true;
  }

  for (let j = 0; j < board[0].length; j++) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] !== "0") break;
      if (i === board.length - 1) return true;
    }
  }

  return false;
}

/** */
function scoreBoard(board) {
  let sum = 0;

  for (let row of board) {
    for (let val of row) {
      if (val === "0") val = 0;
      sum += val;
    }
  }

  return sum;
}


/** Given a path to a text file
 */
async function bingoLast(path) {
  const data = await readData(path);
  let bingoDraws = data[0].split(",");
  let gameBoards = getGameBoards(data);
  let lastBoard = [];
  let lastDraw = null;

  for (let draw of bingoDraws) {
    for (let i = 0; i < gameBoards.length; i++) {
      if (gameBoards[i].length > 0) {
        gameBoards[i] = checkBoard(gameBoards[i], +draw);

        if (checkWin(gameBoards[i])) {
          lastDraw = draw;
          lastBoard = gameBoards[i];
          gameBoards[i] = [];
        }
      }
    }

  }

  let score = scoreBoard(lastBoard);
  let product = (score * lastDraw);
  
  console.log("scoreBoard", score);
  console.log("lastDraw", lastDraw);
  console.log("product", product);

  return product;
}

bingoLast(path);


// node 4_giantSquid.js 4_input.txt