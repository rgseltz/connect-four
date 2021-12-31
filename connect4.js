/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeHeader() {
  const heading = document.createElement("h1");
  const resetBoard = document.createElement("button");
  heading.innerText = "Connect - Four";
  resetBoard.innerText = "Reset Board";
  document.body.appendChild(heading);
  heading.appendChild(resetBoard);
  resetBoard.setAttribute("id", "reset-board");
  resetBoard.addEventListener("click", refreshGame);
}

function refreshGame(e) {
  currPlayer = 1;
  makeBoard();
  piece.className = ""; 
  return console.log(e);
}

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // board = new Array(WIDTH);
  // board.fill(null); 
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = new Array(WIDTH);
    board[i].fill(null);
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // create top row of board
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    headCell.dataset.x = x;
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create remaining cells of board - nested for-loop row by row, creating a cell (td) element, setting an id attribute specific to each coordinate, and appending the cell to the DOM.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      cell.dataset.x = x;
      cell.dataset.y = y;
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--){
    if(!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  if (currPlayer === 1){
    piece.className = "piece p1"; 
  } else if (currPlayer){
    piece.className = "piece p2";
  };
  console.log(`${y}-${x}`);
  document.getElementById(`${y}-${x}`).appendChild(piece); //allen wanted to change this.. to what?
 
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  console.log(evt.target)
  let x = evt.target.dataset.x;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  
  if (y === null) {
    return;
  }
  console.log({ x, y, currPlayer})

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    currPlayer = null;
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  // TODO: switch currPlayer 1 <-> 2
  console.log(board);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeHeader()
makeBoard();
makeHtmlBoard();
