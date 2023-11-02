import { solve, solveForOneSolutionOnly } from "./backtracking.js";

// just quickly draw out the board d
export function render(d) {
   for(let i=0; i<9; i++) {
      if(i%3==0) console.log(" -------------------")
      console.log(`| ${d[i*9+0]} ${d[i*9+1]} ${d[i*9+2]}|${d[i*9+3]} ${d[i*9+4]} ${d[i*9+5]}|${d[i*9+6]} ${d[i*9+7]} ${d[i*9+8]} |`.replaceAll("0", "-"));
   }
   console.log(" -------------------")
}

let board = [
   [0,8,0, 0,9,4, 0,0,0],   
   [0,0,0, 0,0,2, 1,0,3],
   [2,0,3, 0,0,0, 9,4,0],

   [0,0,8, 0,0,0, 7,9,0],
   [9,2,0, 0,0,0, 0,5,6],
   [0,7,6, 0,0,0, 3,0,0],

   [0,0,0, 2,6,0, 0,3,0],
   [3,0,2, 1,0,0, 0,0,0],
   [0,5,7, 0,0,0, 2,0,1],
].flat();

let multipleSolutionsBoard = [
   [0,8,0, 0,9,4, 0,0,0],   
   [0,0,0, 0,0,2, 1,0,3],
   [2,0,3, 0,0,0, 9,4,0],

   [0,0,8, 0,0,0, 7,9,0],
   [9,2,0, 0,0,0, 0,5,6],
   [0,7,6, 0,0,0, 3,0,0],

   [0,0,0, 2,6,0, 0,3,0],
   [3,0,2, 1,0,0, 0,0,0],
   [0,5,7, 0,0,0, 2,0,0],
].flat();

// // solving a board (does not care if multiple solutions exists will just pick the first it can find:)

// render(board);
// solve(board);

// // checking if a board has only one vialble solution
// render(board);
// render(solveForOneSolutionOnly(board, true));
// try {render(solveForOneSolutionOnly(multipleSolutionsBoard, true))} 
// catch (e) {console.log("Error: " + e.message)}

// generating a random sudoku board
let randomBoard = generateRandomValidBoard();
render(randomBoard);

function generateRandomValidBoard() {
   let board = [
      [0,0,0, 0,0,0, 0,0,0],   
      [0,0,0, 0,0,0, 0,0,0],
      [0,0,0, 0,0,0, 0,0,0],
   
      [0,0,0, 0,0,0, 0,0,0],
      [0,0,0, 0,0,0, 0,0,0],
      [0,0,0, 0,0,0, 0,0,0],
   
      [0,0,0, 0,0,0, 0,0,0],
      [0,0,0, 0,0,0, 0,0,0],
      [0,0,0, 0,0,0, 0,0,0],
   ].flat();
   solve(board, true);
   render(board);
   return removeTillOnlyOneSolution(board);
}

function removeTillOnlyOneSolution(board) {
   const length = board.length;
   let indexes = [... Array(length).keys()];
   let previousBoard = [...board];
   for (let _n=0; _n<length; _n++)  {
      const rIdx = Math.floor(Math.random()*indexes.length)
      if (board[indexes[rIdx]] != 0) {
         // try to remove this field!
         try {
            board[indexes[rIdx]] =0;
            solveForOneSolutionOnly(board);

         }catch (e) {
            return previousBoard;
         }
      }
      indexes.splice(rIdx, 1);
      previousBoard = [...board];
   }
}


