// Dancing Links sudoku implementation
// https://github.com/rafalio/dancing-links-java/blob/master/src/dlx/DancingLinks.java
// https://github.com/taylorjg/dlxlibjs/tree/master/lib


// linked list node
class LLNode {
    left;
    right;
    up;
    down;
    column;
    constructor(column) {
        this.left = this;    // might have to start them null instead
        this.right = this;
        this.up = this;
        this.down = this;
        this.column = column;
    }
}

class LLColumn {
    size;
    constructor() {
        this.size = 0;

    }
}

// we expect board array of array of ints. with 1-9 preset value, and 0 for empty
function MakeBoard(board) {
    const ROWS = board.length;
    const COLUMNS = board[0].length;
    
    for(let y=0; y<ROWS; y++) {
        for(let x=0; x<COLUMNS; x++) {

        }
    }
}


function solve(board) {

    var answers = new LLNode();

    var header; //: ColumnNode
    var solutions = 0;
    var updates = 0;
    var handler; // solutionHandler
    var answer; // List<DancingNode>
    var verbose = true;
    search(0);
}


function search(k) {
    if(header.R == header) {
        // all columns are removed
        if(verbose) {
            console.log("---------");
            console.log("Solution #" + solutions + "\n");
        }
        handler.handleSolution(answer);
        if(verbose) console.log("---------");
        solutions++;

    } else {
        let c = selectColumNodeHeuristic();
        c.cover();
        for(let r=r.right; r!=c; r = r.down) {
            answer.add(r);
            for(let j=r.right; j!=r; j=r.right) {
                j.column.cover();
            }
            search(k+1);
            r = answer.remove(answer.size() - 1);
            c = r.column;

            for(let j=r.left; j!=r; j=j.left) {
                j.column.uncover();
            }
        }
        c.uncover();
    }
}

// dumb implementation, but should still work. TODO: select with highest/lowest row count
function selectColumNodeHeuristic() {
    return header.right;    // : ColumnNode
}