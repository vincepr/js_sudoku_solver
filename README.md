# Backtracking Sudoku solver

- simple backtracking sudoku solver. got arround 14ms-20ms(is this with jit? not sure maybe read up if we can force a coldstart?) solves on my 1 core vps.
- sudoku generator (using the backtracking algo is woring) while guaranteeing single solution
- todo: implementing Knuth's dancing Links Algorithm.

## from a Solver to a Generator
1. generate a random valid sudoku grid
2. pick a random  cell in the grid and remove it
3. solve what is left, if it has multiple solutions we remove another cell. If not we go one step back and are done.

## Knuths dancing links algorithm
= references:
    - https://garethrees.org/2007/06/10/zendoku-generation/
= from Wikipedia: `dancing links (DLX) is a technique for adding and deleting a node from a circular doubly linked list. It is particularly useful for efficiently implementing backtracking algorithms... for the exact cover problems.`

= **Main idea** - DLX is based on the observation, that in a doubly linked list of nodes, a circular reference can be removed by just 2 changes without affecting the rest of the structure.

### Exact Cover Problem
An exact cover problem is a problem, where given a set of choices and a set of constraints, we have to choose a full list of choices that adhere to the constraints.

A good way to visualize this is to draw out a table where the constraints are columns and the choices are rows. We mark (with an X) the cells where a choice fulfills that constraint.



### Knuths Algorithm X
1. Pick an unsatisfied constraint, so a column with no X. If there are no unsatisfied constraints remaining the solution is coplete. If all we want is any solution were done successfully. If what were after is get all solutions we take note of this solution then backtrack and choose the next choice instead.
2. Pick a row that satisfies that constraint, so a row with an X in that column. If there is no such row, then we reached a dead end, and must backtrack to the previous row we chose and make another choice there.
3. Add that row to the solution set.
4. Delete all rows that satisfy any of the constraints satisfied by the chose row. that is all rows that have an X in the same colum as the X in the chosen row.
5. return to step 1.

#### Dancing Links - aka. DLX
An efficient technique for implementing Algorithm X.
- Our 9×9 sudoku has 324 constraints and 729 ways of placing a number. https://www.stolaf.edu/people/hansonr/sudoku/exactcovermatrix.htm
- we need to be able to search efficiently along columns (in step 2 and 4) and along rows(in step 4). So we'll implement a linked list for each row and column
- we need to efficiently remove cells for their colum(step 4) so we do a doubly linked list for fast removals.
- This means every cell has four pointers. (prevRow, nextRow and prevColumn and nextColum )
- to be able to pick the best column to search(step ) we will have an additional data structure representing columns with a count of the number of occopied cells in each.
