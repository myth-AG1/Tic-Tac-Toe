class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0
        };
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.updateStatus();
        this.clearBoard();
        this.removeGameOverClass();
    }
    
    // DOM Elements 
    getStatusElement() {
        return document.getElementById('status');
    }
    
    getGameBoardElement() {
        return document.getElementById('gameBoard');
    }
    
    getScoreElement(player) {
        return document.getElementById(`score${player}`);
    } 
    
    // Game Logic
    handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
        
        if (this.gameBoard[cellIndex] !== '' || !this.gameActive) {
            return;
        }
        
        this.gameBoard[cellIndex] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (this.gameBoard[a] && 
                this.gameBoard[a] === this.gameBoard[b] && 
                this.gameBoard[a] === this.gameBoard[c]) {
                this.highlightWinningCells(condition);
                return true;
            }
        }
        return false;
    }
    
    checkDraw() {
        return this.gameBoard.every(cell => cell !== '');
    }
    
    highlightWinningCells(winningCells) {
        winningCells.forEach(index => {
            const cell = document.querySelector(`[data-cell-index="${index}"]`);
            cell.classList.add('winning');
        });
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScore(this.currentPlayer);
        this.getStatusElement().textContent = `Player ${this.currentPlayer} wins!`;
        this.addGameOverClass();
    }
    
    handleDraw() {
        this.gameActive = false;
        this.getStatusElement().textContent = "It's a draw!";
        this.addGameOverClass();
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }
    
    // UI Updates
    updateStatus() {
        this.getStatusElement().textContent = `Player ${this.currentPlayer}'s turn`;
    }
    
    updateScore(player) {
        this.getScoreElement(player).textContent = this.scores[player];
    }
    
    clearBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
    }
    
    addGameOverClass() {
        this.getGameBoardElement().classList.add('game-over');
    }
    
    removeGameOverClass() {
        this.getGameBoardElement().classList.remove('game-over');
    }
    
    // Event Listeners
    setupEventListeners() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        const restartBtn = document.getElementById('restartBtn');
        restartBtn.addEventListener('click', () => this.restartGame());
    }
    
    restartGame() {
        this.initializeGame();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
    game.setupEventListeners();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effect (optional)
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            if (!cell.textContent && game.gameActive) {
                cell.style.transform = 'scale(1.05)';
            }
        });
        
        cell.addEventListener('mouseleave', () => {
            cell.style.transform = 'scale(1)';
        });
    });
    
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
            document.getElementById('restartBtn').click();
        }
    });
    
    // Add touch support for mobile
    cells.forEach(cell => {
        cell.addEventListener('touchstart', (e) => {
            e.preventDefault();
            cell.click();
        });
    });
});