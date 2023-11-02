// generates a peseudo-random board by randomly solving an empty board
export function generateRandomBoard() {
   let data = []
   for(let i=0; i<81; i++) {
      data.push(0); 
   }
   solve(data, true);
   render(data);
   return data;
}

// solve the board d of a 81 piece sudoku. If more than one or no Solution exists it throws.
export function solveForOneSolutionOnly(d) {
   let backtrackCounter = 0;
   let firstSolution = false;
   console.time("solveTime")
   if (!solveFromIdx(d,0, false)) {
      console.timeEnd("solveTime")
      console.log(`solve finished while backtracking ${backtrackCounter} times.`);
      if (firstSolution) return firstSolution
      else throw new Error("found no single solution");
   }
   console.timeEnd("solveTime")
   console.log(`solve finished while backtracking ${backtrackCounter} times.`);

   throw new Error("found to many solutions");

   function solveFromIdx(d, idx, randomize = false) {
      // skip prefilled cells
      while(idx<81 && d[idx] !== 0) {
         idx++;
      }
      if (idx >= 81) return foundSolution();

      // see if solution is valid
      let possibles = getValidNrs(d, idx, randomize);
      for(let nr of possibles) {
         d[idx] = nr;
         if (solveFromIdx(d, idx+1, randomize)) return foundSolution();
      }
      // we must undo move if we recurse back while returning fals upstream
      d[idx] = 0
      backtrackCounter ++;
      return false;

      function foundSolution() {
         if (!firstSolution) {
            firstSolution = true;
            firstSolution = JSON.parse(JSON.stringify(d));
            // TODO: make a copy of this found solution.
            return false;
         } else {
            return true;
         }
      }
   }
}

// solve the board d of a 81 piece sudoku
export function solve(d, randomize = false) {
   let backtrackCounter = 0;
   console.time("solveTime")
   if (!solveFromIdx(d,0, randomize)) throw "found no solution"
   console.timeEnd("solveTime")
   console.log(`solve finished while backtracking ${backtrackCounter} times.`);

   function solveFromIdx(d, idx, randomize = false) {
      // skip prefilled cells
      while(idx<81 && d[idx] !== 0) {
         idx++;
      }
      if (idx >= 81) return true;

      // see if solution is valid
      let possibles = getValidNrs(d, idx, randomize);
      for(let nr of possibles) {
         d[idx] = nr;
         if (solveFromIdx(d, idx+1, randomize)) return true;
      }
      // we must undo move if we recurse back while returning fals upstream
      d[idx] = 0
      backtrackCounter ++;
      return false;
   }
}

function getValidNrs(d, idx, randomize = false) {
   let nrs =[1,2,3 ,4,5,6, 7,8,9]; 
   if (randomize) nrs = nrs.sort(el => Math.random() -0.5); // with this we can generate sudo-random boards by just solving empty boards
   let valids = [];
   for(let nr of nrs) {
      if (isValidNr(d, idx, nr)) valids.push(nr);
   }
   return valids;
} 

function isValidNr(d, idx, val) {
   let xStart = Math.floor(idx/9) * 9;
   let yStart = (idx%9);
   
   // check if X is ok
   for(let i = xStart; i < (xStart + 9); i++) {
      if (d[i] == val) return false;
   }
   
   // check if Y is ok
   for(let i = yStart; i < (yStart + 9*9); i+=9) {
      if (d[i] == val) return false;
   } 
   
   // check if 3x3 Box is ok
   let xBox;
   if (yStart >= 6) xBox = [6,7,8]
   else if (yStart >= 3) xBox = [3,4,5];
   else xBox = [0,1,2];

   let yBox;
   if(xStart >= 54) yBox = [54,63,72]
   else if(xStart >= 27) yBox = [27,36,45]
   else yBox = [0,9,18];

   for (let i of xBox) {
      for (let ii of yBox) {
         if (d[i+ii] === val) return false;
      }
   }

   // all checks are ok so this is a possible nr for that idx
   return true;
}