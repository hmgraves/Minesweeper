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
    const mineCoordinates = Array.from({length: 10}, () => 'sq' + Math.floor(Math.random() * 81));
    return mineCoordinates;
} 

let randomMines = randomlyGenerateMineCoordinates();
console.log(randomMines)

/*----- EVENT LISTENERS -----*/
/*----- game reset button -----*/
buttonEl.addEventListener('click', function(evt) {
    console.log('reset clicked');
    init();
});

/*----- left clicking on a square -----*/
tbodyEl.addEventListener('click', function(playerLeftClick) {
    console.log(document.getElementById(playerLeftClick.target.id).attributes.id.value);

    let square = document.getElementById(playerLeftClick.target.id).attributes.id.value;
    if (square = randomMines.find(mine => mine === square)) {
        console.log('contains mine');
        document.getElementById(square).classList.add('bombed');
    } else {
        console.log('contains no mine');
        // square.classList.remove('flagged')  // removes flag
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



// let test = document.getElementById('sq1');
// test.classList.add('bombed')
// console.log(test)

// let minedBoard = board.find(num=> randomlyGenerateMines.includes(num))












