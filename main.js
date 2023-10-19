
// create our field
let data = []
for(let i=0; i<81; i++) {
   data.push(0); 
}

let rngidx = Math.ceil(Math.random()*81)-1;  // 0..80
let rngnr = Math.ceil(Math.random()*9);      // 1..9
data[rngidx] = rngnr;
render(data);
solve(data);
render(data)


for(let i=0; i<81; i++) {
   console.log(Math.floor(i/9) * 9)
}

// just quickly draw out the board
function render(d) {
   for(let i=0; i<9; i++) {
      if(i%3==0) console.log(" -------------------")
      console.log(`| ${d[i*9+0]} ${d[i*9+1]} ${d[i*9+2]}|${d[i*9+3]} ${d[i*9+4]} ${d[i*9+5]}|${d[i*9+6]} ${d[i*9+7]} ${d[i*9+8]} |`.replaceAll("0", "-"));
   }
   console.log(" -------------------")
}

// solve the board d of a 81 pice sudoku
function solve(d) {
   solveFromIdx(d, 0);
   function solveFromIdx(d, idx) {
      // skipp filled out ones
      while(!d[idx]) {
         idx++;
      }
      // see if solution is valid
      let possibles = getValidNrs(d, idx);
      for(nr of possibles) {
         d[idx] = nr;
         if (solveFromIdx(idx+1)) return true;
      }
      // we must undo move if we recurse back while returning fals upstream
      d[idx] = 0;
      return false;
   }
}

function getValidNrs(d, idx) {
   const nrs =[1,2,3 ,4,5,6, 7,8,9]; 
   let valids = [];
   for(nr in nrs) {
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
   if (yStart > 5) xBox = [6,7,8]
   else if (yStart > 3) xBox = [3,4,5];
   else xBox = [0,1,2];

   let yBox;
   if(xStart >= 54) yBox = [54,63,72]
   else if(xStart >= 27) yBox = [27,36,45]
   else yBox = [0,9,18];

   for (let i in xBox) {
      for (let ii in yBox) {
         if (d[i+ii] === val) return false;
      }
   }

   // all checks are ok so this is a possible nr for that idx
   return true;
}