/*----- CONSTANTS -----*/
const width = 9;
const table = document.getElementById('table');

generateBoard();



/*----- app's state (VARIABLES) -----*/
let score, winner;
let mines = 10; 
let flags = 0;
let gameOver = false;

/*----- CACHED ELEMENTS  -----*/
const tbodyEl = document.querySelector('tbody');
const buttonEl = document.querySelector('button');




checkWin();

/*----- EVENT LISTENERS -----*/
/*----- game reset button -----*/
buttonEl.addEventListener('click', function(evt) {
    console.log('reset clicked');
    // init();
});

/*----- left clicking on a square -----*/
tbodyEl.addEventListener('click', function(playerLeftClick) {

    let squareClicked = document.getElementById(playerLeftClick.target.id).attributes.id.value;

    let element = document.getElementById(playerLeftClick.target.id);
    console.log(element.getAttribute("has-mine")=="true");
    if (element.getAttribute("has-mine")=="true") {
        element.classList.add('bombed');
        document.getElementById('mines-remaining').innerHTML = 'Game Over!';
        gameOver = true;
        checkWin();
    } else {
        element.classList.add('clicked');
    }
});

/*----- right clicking on a square to add/remove flag-----*/
tbodyEl.addEventListener('contextmenu', function(playerRightClick) {
    const element = document.getElementById(playerRightClick.target.id);

    if (element.className != 'flagged') {
            element.classList.add('flagged');
            flags++;
            document.getElementById('mines-remaining').innerHTML = 'Mines remaining: ' + (mines - flags); // updates mine count
        } else { 
            element.classList.remove('flagged')  // removes flag
            flags--;
            document.getElementById('mines-remaining').innerHTML = 'Mines remaining: ' + (mines - flags); // updates mine count
        }

    playerRightClick.preventDefault();
    return false; /* Return false so that context menu does not pop up */
}, false);


/*----- FUNCTIONS -----*/


/* Timer once first square is clicked */
tbodyEl.onclick = function(){
    let secs = 0;
    let time = setInterval(function () {
        document.getElementById('timer').innerHTML = `Timer: ${secs++}`;
    }, 1000);
   this.onclick = null; // Stops timer from activating again on additional clicks. 
};

// generates game board
function generateBoard() {
    table.innerHTML = "";
    for (let r = 0; r < 10; r++) {
        row = table.insertRow(r);
        for (let c = 0; c < 10; c++) {
            cell = row.insertCell(c);
            let id = document.createAttribute('id');
            id.value = `${r}${c}`; // adds in unique IDs to each cell in order for buttons to function
            let mine = document.createAttribute("has-mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
            cell.setAttributeNode(id);
        }
    }
    randomlyGenerateMineCoordinates()
}

// generated randomly placed mines on game board
function randomlyGenerateMineCoordinates() {
    for (let i = 0; i < 10; i++) {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);
        let cell = table.rows[row].cells[column];
        cell.setAttribute("has-mine", "true");
    }
}

// shows all mines if one mine is clicked 
function showMines() {
    for (let i=0; i<10; i++) {
        for(let j=0; j<10; j++) {
            let cell = table.rows[i].cells[j];
            if (cell.getAttribute("has-mine")=="true") cell.className="bombed";
        }
    }
}

// checks to see if game was won
function checkWin() {
    if (gameOver === false) {
        console.log('continue game')
    } else {
        gameOver === true;
        showMines();
    }
}

// shows surrounding cells on click 


// function clickCell(cell) {
//     //Check if the end-user clicked on a mine
//     if (cell.className = "clicked" ) {
//       //Count and display the number of adjacent mines
//       let mineCount = 0;
//       let cellRow = cell.parentNode.rowIndex;
//       let cellColumn = cell.cellIndex;
//       //alert(cellRow + " " + cellCol);
//       for (let i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
//         for(let j=Math.max(cellColumn-1,0); j<=Math.min(cellColumn+1,9); j++) {
//           if (table.rows[i].cells[j].getAttribute("has-mine")=="true") mineCount++;
//         }
//       }
//       cell.innerHTML=mineCount;
//       if (mineCount==0) { 
//         //Reveal all adjacent cells as they do not have a mine
//         for (let i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
//           for(let j=Math.max(cellColumn-1,0); j<=Math.min(cellColumn+1,9); j++) {
//             //Recursive Call
//             if (table.rows[i].cells[j].innerHTML=="") clickCell(table.rows[i].cells[j]);
//           }
//         }
//       }
//       checkWin();
//     }
//   }
