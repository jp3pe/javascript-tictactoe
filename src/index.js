window.onload = function () {
    const DOM_ROOT = document.getElementById("root");

    // return <button class="square">
    function Square(valueInput) {
        let value = "";
        let result = ``;
        if (valueInput !== null) {
            value = valueInput
        }

        result += `` +
            `<button class="square">` +
            `${value}` +
            `</button>`

        return result;
    }

    function calculateWinner(squares) {
        // When game board is equal with element from lines
        const LINES = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Detect win by loop
        for (let i = 0; i < LINES.length; i++) {
            // Get nth line's elements
            const [A, B, C] = LINES[i];
            // Determine a == b == c by indexes from lines
            if (squares[A] && (squares[A] === squares[B]) && (squares[A] === squares[C])) {
                return squares[A];
            }
        }

        return null;
    }

    class Board {
        DOM_STATUS = document.getElementById("status");
        DOM_GAME_BOARD = document.getElementById("game-board");
        state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };

        handleClick(i) {
            const SQUARES = this.state.squares.slice();
            // When user click the button after somebody won
            if (calculateWinner(SQUARES) || SQUARES[i]) {
                // Do nothing
                return;
            }

            // Change clicked index and apply it to current squares
            SQUARES[i] = this.state.xIsNext ? 'X' : 'O';
            this.state = {
                squares: SQUARES,
                xIsNext: !this.state.xIsNext,
            }

            // Refresh html DOM
            this.render();
        }

        renderSquare(i) {
            return (
                Square(this.state.squares[i])
            )
        }

        // Draw Board DOM
        render() {
            const WINNER = calculateWinner(this.state.squares);
            let status;

            if (WINNER) {
                status = "Winner: " + WINNER;
            } else {
                status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
            }

            // Draw DOM in game-board
            this.DOM_STATUS.innerText = status;
            this.DOM_GAME_BOARD.innerHTML = `` +
                `<div>` +
                `<div class="board-row">` +
                this.renderSquare(0) +
                this.renderSquare(1) +
                this.renderSquare(2) +
                `</div>` +
                `<div class="board-row">` +
                this.renderSquare(3) +
                this.renderSquare(4) +
                this.renderSquare(5) +
                `</div>` +
                `<div class="board-row">` +
                this.renderSquare(6) +
                this.renderSquare(7) +
                this.renderSquare(8) +
                `</div>` +
                `</div>`;

            const SQUARES = document.getElementsByClassName("square");
            for (let i = 0; i < SQUARES.length; i++) {
                // Add onClick event listener to square class
                SQUARES[i].addEventListener("click", () => {
                    this.handleClick(i);
                    // Change clicked square's html content
                    SQUARES[i].innerText = this.state.squares[i];
                });
            }
        }
    }

    class Game {
        render() {
            DOM_ROOT.innerHTML = `` +
                `<div id="game">` +
                `<div id="game-board">` +
                `</div>` +
                `<div id="game-info">` +
                `</div>` +
                `</div>`;

            let board = new Board();
            board.render();
        }
    }

    // Start from here!
    let game = new Game();
    game.render();
}