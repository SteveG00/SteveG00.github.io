//Declare Global variables
var tileLength = 20;  //length of each tile (in px)
var noMines = 100;     //No mines that will be placed in the board
var grid;
var cols;
var rows;
var unopened = 0;
var showAlert = true; //used to stop the Alert continuously looping itself
var score = 0;
var wonGame = false;
var lostGame = false;
var font; // Only works if the website is hosted on a webServer, due to security reasons.
var timerStart = false;


function draw() {               //Runs continiously
   background(51, 102, 204);    //draws and updates the canvas (board)
  for (var i = 0; i < cols; i++) {  
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(); 
     }
  }
}

function make2DArray(cols, rows) {    //Creates a new 2D array when called
  var arr = new Array(cols);          // define 1D array
  for (var i = 0; i < arr.length; i++) { 
    arr[i] = new Array(rows);          //populate 1D array with a new array (2D array)
  }
  return arr; // Return unpopulated 2d Array
}


function setup() {                    //Function is called onLoad
  updateScore();          
  createCanvas(500, 500);            	//create canvas size 401x401
  cols = floor(width / tileLength);	          //calculate the number of columns
  rows = floor(height / tileLength);	          //calculate the number of rows
  grid = make2DArray(cols, rows);	    //call the 'make2DArray' Function
  for (var i = 0; i < cols; i++) {	   
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Tile(i, j, tileLength);	//define each cell as a new 'Tile'
      if (grid[i][j].revealed === false) {
        unopened++
      }
    }
  }


// Randomly picks mine locations 
for (var n = 0; n < noMines; n++) {
var i = floor(random(cols));
var j = floor(random(rows));
grid[i][j].mine = true;
}

 
  for (var i = 0; i < cols; i++) {    
    for (var j = 0; j < rows; j++) {
      grid[i][j].getNeighbours();   //Runs the getNeighbours() Function for each tile
       }
   }
}




function mousePressed() {   //Executes on mousePress
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (unopened === noMines) {
        if (showAlert) {
        wonGame = true; 
        score = score + 50;   // adds 50 score once the game has been won.
        if (time < 60) {
          alert('Game Won with a score of ' + score + '\n\nCompleted with a time of ' + time + ' Seconds'); // Prompts the user with their score and time in seconds
        } else if (time >= 60) {
          alert('Game Won with a score of ' + score + '\n\nCompleted with a time of ' + minutes + ' Minutes ' + seconds + ' Seconds'); // Prompts the user with score and time in Minutes
        }
        gameWon();  
        showAlert = false;  // prevents the alert from being loop indefinitely
        updateScore();
      }
    }

      if (grid[i][j].mousePoint(mouseX, mouseY)) {    //checks to see whether a tile has been clicked on
        if (grid[i][j].revealed === false) {
        grid[i][j].reveal();    //if condition is met, the tile is revealed
        updateScore();
        if (grid[i][j].mine) {  // Calls isOver() function when a mine is revealed
          if (grid[i][j].flagged === false) {
          lostGame = true;
          isOver();
          if (timerStart === true) {
            stopTimer();
            timerStart = false;
          }
          if (time < 60) {  // condition for time in seconds
          alert('Game Over! \nYou scored ' + score + ' with a time of ' + (time) + ' Seconds'); //prompts the user with a message that the game is lost, with time in seconds
          updateScore();
        } else if (time >=60) { // checks for time in minutes
          alert('Game Over! \nYou scored ' + score + ' with a time of ' + minutes + ' Minutes ' + seconds + ' Seconds'); //prompts the user with a message that the game is lost, with time in minutes
          updateScore();
        }
        
        }
      }
    }
   }
  }
}
}


function Flag() {   
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].mousePoint(mouseX, mouseY)) {    //checks to see whether a tile has been clicked on
        grid[i][j].flagTile();    //if condition is met, the tile is revealed
     }
    }
   }
  }

function UnFlagTile() {   
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].mousePoint(mouseX, mouseY)) {    //checks to see whether a tile has been clicked on
        grid[i][j].unflag();    //if condition is met, the tile is revealed
     }
    }
   }
  }

function keyPressed() {
  if (keyCode === 88) {   //executes the 'Flag()' Function every time the 'X' key is pressed
     Flag();
  } else if (keyCode === 90) {  //executes teh 'UnFlagTile()' Function every time the 'Z' key is preessed
    UnFlagTile();
  }
}




function gameWon() {
 for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
        grid[i][j].revealed = true;   //Changes the property of each cell to reveal itself
        stopTimer();
    }
  }
}

function isOver() { 				          //Game over function

		 for (var i = 0; i < cols; i++) {
    		for (var j = 0; j < rows; j++) {
   			grid[i][j].revealed = true;		//Changes the property of each cell to reveal itself
		}
	}
}

function reloadPage() { //reloads the current webpage when called
  location.reload();
}

function updateScore() {     
var element = document.getElementById("score");  //Updates the 'span' displaying score diplayed in the html page
if (wonGame) {
element.innerHTML = "Score: " + score + " (Game Won)";  //condition for when game is won
} else if (lostGame) {
    element.innerHTML = "Score: " + score + " (Game Lost)"; //condition for when game is lost
  } else {
    element.innerHTML = "Score: " + score; //condition for when game is in progress
  }
}
