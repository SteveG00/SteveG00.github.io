var h1 = document.getElementById('timer') //referencing html elements
var start = document.getElementById('start')
var stop = document.getElementById('stop')
var clear = document.getElementById('clear')
var seconds = 0 // Declare Global Variables
var minutes = 0;
var time = 0;       
var active = false;


/* Recursive incrementation of the timer*/
function add() {    //adds one second to the timer when called
     if (active === true) {
    seconds++;      //increments seconds

    //Converts 60 seconds to 1 minute on the timer
    if (seconds >= 60) {    
        seconds = 0;
        minutes++;  
    }

  h1.textContent = "Time : " + twoDigits(minutes) + ":" + twoDigits(seconds);   // Displays the timer on the html page (updates the value of the h1);
 
    time = setTimeout(add, 1000);   // Function calls itself recursively once every second.
    }
}


function twoDigits(value) {
    return ('00' + value).slice(-2);    //takes the value parameter and returns it in a two digit format
}





  
/* Start Timer */
function startTimer() {
    active = true;
   add();
   
}


/* Stop Timer */
function stopTimer() {
        clearTimeout(time);
        active = false;
}






