// select all cells
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameIsActive = true;

// all possible winning combinations
const winPatterns = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8], // diagonals
    [2, 4, 6]
];

function checkWin() {
    // some method iterate and checks if any winning pattern is met
    return winPatterns.some(([a, b, c]) => {
        // return true if all three cells in the pattern are the same and not empty (it checksthat cell should be filled and not empty)
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// every method checks if all cells are filled
function checkDraw() {
    return board.every((cell) => cell !== '');
}

function updatePlayerPosition(index) {
    board[index] = currentPlayer;
}

function showMove(cell,index) {
    cell.textContent = board[index];
}

function playTurn(cell, index) {
    updatePlayerPosition(index);
    showMove(cell, index);
}

function showStatusMessage(message) {
    statusText.textContent = message;
}

function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    showStatusMessage(`Player ${currentPlayer}'s turn`);
}

function endGame(message) {
    gameIsActive = false;
    showStatusMessage(message);
}

function checkGameResult() {
    if (checkWin()) {
        endGame(`Player ${currentPlayer} has won!`);
    } else if (checkDraw()) {
        endGame("It's a draw!");
    } else {
        switchPlayer();
    }
}

function isMoveAllowed(index) {
    return board[index] === '' && gameIsActive;
}

function onCellClick(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    
    if (!isMoveAllowed(index)) return; 
    
    playTurn(e.target, index);
    checkGameResult();
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameIsActive = true;

    // empty all cells
    cells.forEach((cell) => {
        cell.textContent = '';
    });
    showStatusMessage(`It's ${currentPlayer}'s turn`);
}

function setupEventListeners() {
    cells.forEach((cell) => {
        cell.addEventListener('click', onCellClick)
    });
    resetBtn.addEventListener('click', resetGame);
}

function startGame() {
    setupEventListeners();
    showStatusMessage(`It's ${currentPlayer}'s turn`);
}

startGame();