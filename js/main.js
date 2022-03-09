/*----- CONSTANTS -----*/
const width = 9;
const tbody = document.querySelector('tbody');

/*----- app's state (VARIABLES) -----*/
let score, winner;
let mines = 10; 
let flags = 0;
let gameOver = false;

/*----- CACHED ELEMENTS  -----*/
const tbodyEl = document.querySelector('tbody');
const buttonEl = document.querySelector('button');
function randomlyGenerateMineCoordinates() {
    const mineCoordinates = Array.from({length: 10}, () => Math.floor(Math.random() * 81));
    return mineCoordinates;
} 

let randomMines = randomlyGenerateMineCoordinates();
console.log(randomMines)

function checkWin() {
    if (gameOver === false) {
        console.log('continue game')
    } else {
        gameOver === true;
        console.log('game over')
    }
}

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
    console.log(squareClicked)

    if (randomMines.find(mine => mine === squareClicked)) { 
        document.getElementById(squareClicked).classList.add('bombed'); // adds mine to screen
        document.getElementById('mines-remaining').innerHTML = 'Game Over!';
        gameOver = true;
        checkWin();

    } else if (squareClicked === randomMines.find(mine => {
        console.log(mine);
        console.log(mine + 1);
        mine + 1
        
        })) {
        document.getElementById(squareClicked).classList.add('one');
        console.log(squareClicked);
    
    }
    // console.log('square clicked')
});
/*----- right clicking on a square to add/remove flag-----*/
tbodyEl.addEventListener('contextmenu', function(playerRightClick) {

    const element = document.getElementById(playerRightClick.target.id);

    if (element.classList != 'flagged') {
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


let board = document.querySelectorAll('td');

/* Timer once first square is clicked */
tbodyEl.onclick = function(){
    let secs = 0
    let time = setInterval(function () {
        document.getElementById('timer').innerHTML = `Timer: ${secs++}`;
    }, 1000);
   this.onclick = null; // Stops timer from activating again. 
};



