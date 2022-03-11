/*----- CONSTANTS -----*/
$(document).ready(function () {

    const table = document.getElementById('table');

    createBoard();

    /*----- CACHED ELEMENTS  -----*/
    const tbodyEl = document.querySelector('tbody');
    const buttonEl = document.querySelector('button');

    /** TIMER */
    let begin;
    let end;
    let timer;

    $(tbodyEl).one('click', () => {
        begin = new Date();
        timer = setInterval(update, 1000);
    });

    const update = () => {
        end = new Date();
        elapsed = (end - begin);
        let min = Math.floor((elapsed / 1000 / 60) << 0);
        let sec = Math.floor((elapsed / 1000) % 60);

        document.getElementById('timer').innerHTML = `Timer: ${min} : ${sec}`;
    }

    /*----- app's state (VARIABLES) -----*/
    const mines = 10;
    let flags = 0;
    let gameOver = false;

    /*----- EVENT LISTENERS -----*/
    /*----- game reset button -----*/
    buttonEl.addEventListener('click', function (evt) {
        window.location.reload();
    });

    /*----- left clicking on a square -----*/
    let test = $('tbody').addClass('end-game')
    $('.end-game').on('click', playerLeftClick)

    function playerLeftClick(playerLeftClick) {
        let element = document.getElementById(playerLeftClick.target.id);

        if (element.getAttribute('has-mine') === 'true') {
            element.classList.add('bombed');
            document.getElementById('flags-placed').innerHTML = 'Game Over You Lose!';
            gameOver = true;
            showMines();
            clearInterval(timer);
            checkWin();
        } else {
            element.classList.add('clicked');
            cellOnClick(playerLeftClick.target);
        }
    }

    /*----- right clicking on a square to add/remove flag-----*/
    tbodyEl.addEventListener('contextmenu', function (playerRightClick) {
        const element = document.getElementById(playerRightClick.target.id);

        if (element.className != 'flagged') {
            element.classList.add('flagged');
            flags++;
            document.getElementById('flags-placed').innerHTML = 'Flags placed: ' + (flags); // updates flag count
        } else {
            element.classList.remove('flagged');  // removes flag
            flags--;
            document.getElementById('flags-placed').innerHTML = 'Flags placed: ' + (flags--); // updates flag count
        }

        playerRightClick.preventDefault();
        /* Return false so that context menu does not pop up */
        return false;
    }, false);


    /*----- FUNCTIONS -----*/

    // Creates game board
    function createBoard() {
        table.innerHTML = "";
        for (let r = 0; r < 10; r++) {
            row = table.insertRow(r);
            for (let c = 0; c < 10; c++) {
                cell = row.insertCell(c);
                let id = document.createAttribute('id');
                id.value = `${r}${c}`; // adds in unique IDs to each cell in order for buttons to function
                let mine = document.createAttribute('has-mine');
                mine.value = false;
                cell.setAttributeNode(mine);
                cell.setAttributeNode(id);
            }
        }
        randomlyGenerateMineCoordinates();
    }

    // generated randomly placed mines on game board
    function randomlyGenerateMineCoordinates() {
        for (let m = 0; m < 10; m++) {
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            let cell = table.rows[row].cells[column];
            cell.setAttribute('has-mine', true);
        }
    }

    // shows all mines if one mine is clicked 
    function showMines() {
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                let cell = table.rows[r].cells[c];
                if (cell.getAttribute('has-mine') === 'true') {
                    cell.className = 'bombed';
                }
            }
        }
    }

    // checks each cell to see if game has been won
    function checkWin() {
        let gameOver = true;
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                if ((table.rows[r].cells[c].getAttribute('has-mine') === 'false') && (table.rows[r].cells[c].innerHTML === "")) {
                    gameOver = false;
                }
            }
        }
        if (gameOver) {
            document.getElementById('flags-placed').innerHTML = 'Game Over You Win!';
            showMines();
            clearInterval(timer);
        }
    }

    // shows surrounding cells on click 
    function cellOnClick(cell) {
        //Check if the end-user clicked on a mine
        if (cell.classList === 'bombed') {
            showMines();
        } else {
            cell.className === 'clicked';
            cell.classList.add('clicked');

            //Count and display the number of adjacent mines
            let mineCount = 0;
            let cellRow = cell.parentNode.rowIndex;
            let cellColumn = cell.cellIndex;

            for (let r = Math.max(cellRow - 1, 0); r <= Math.min(cellRow + 1, 9); r++) {
                for (let c = Math.max(cellColumn - 1, 0); c <= Math.min(cellColumn + 1, 9); c++) {
                    if (table.rows[r].cells[c].getAttribute('has-mine') === 'true') {
                        mineCount++;
                    }
                }
            }
            cell.innerHTML = mineCount;
            if (mineCount == 0) {
                // Reveal nearby cells
                for (let r = Math.max(cellRow - 1, 0); r <= Math.min(cellRow + 1, 9); r++) {
                    for (let c = Math.max(cellColumn - 1, 0); c <= Math.min(cellColumn + 1, 9); c++) {
                        // Recursive Call to search through all cells
                        if (table.rows[r].cells[c].innerHTML === "") {
                            cellOnClick(table.rows[r].cells[c]);
                        }
                    }
                }
            }
            checkWin();
        }
    }
});
