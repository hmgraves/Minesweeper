/*----- constants -----*/


/*----- app's state (variables) -----*/
const tbodyEl = document.querySelector('tbody');
const buttonEl = document.querySelector('button');

/*----- cached element references -----*/


/*----- event listeners -----*/
    /*----- game reset button -----*/

buttonEl.addEventListener('click', function(evt) {
    console.log('reset clicked');
});

    /*----- clicking on a sqaure -----*/
tbodyEl.addEventListener('click', function() {
    console.log('square clicked')
});

/*----- functions -----*/
