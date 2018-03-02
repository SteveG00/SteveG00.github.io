// Minesweeper Game Adv Higher Project
// Stephen Graham

function Tile(i, j, tileLength) {     // Tile Class Definition

//Constructor for Tile Class properties

  this.i = i;              //columns definition
  this.j = j;              //rows definition
  this.x = tileLength * i;          //x-axis definition
  this.y = tileLength * j;          //y-axis definition
  this.tileLength = tileLength;     //Tile's Length definition
  this.noNeighbours = 0;  //No. Neighbours definition
  this.revealed = false;    //Revealed State definition
  this.flagged = false;
  this.mine = false;
}


Tile.prototype.reveal = function() {
  if (this.flagged === false) {
     this.revealed = true;    // Reveals a tile if not flagged
     unopened--               // decrements the unopened variable each time a tile is revealed
     if (this.mine === false) {
     score++                  //increments the score each time a tile is revealed that isn't a mine
    }
  if (timerStart === false) { // prevents the startTimer() function from being called continuously
    timerStart = true;
    startTimer();

    }
  }      
   if (this.noNeighbours === 0) { //calls the floodFill() function when a user clicks on a blank tile
    this.floodFill();
   }
}

Tile.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.tileLength && y > this.y && y < this.y + this.tileLength);         //returns the value of the current position
}


Tile.prototype.show = function() {
  stroke(0);                                                  // Defines the black border for each cell
  noFill();                                                   // Prevents the entire cell from being filled with a specific colour
  rect(this.x, this.y, this.tileLength, this.tileLength);     // draws a rectangle for each cell
  if (this.flagged) {
    fill(178,34,34);
    ellipse(this.x + this.tileLength * 0.5, this.y + this.tileLength * 0.5, this.tileLength * 0.75, this.tileLength * 0.75);
  }

  if (this.revealed) {
    if (this.mine) {
      fill(127);
      ellipse(this.x + this.tileLength * 0.5, this.y + this.tileLength * 0.5, this.tileLength * 0.75, this.tileLength * 0.75); //draw ellipse if the revealed tile contains a mine
    } else {

      fill(200);
      rect(this.x, this.y, this.tileLength, this.tileLength);
      if (this.noNeighbours > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.noNeighbours, this.x + this.tileLength * 0.5, this.y + this.tileLength - 5); // Fills the tile with the number of surrounding mines
      }
      }
     }
    }
  

Tile.prototype.getNeighbours = function() {  // calculates the number of surrounding Neighbouring mines for a specific tile
 
  var total = 0;

  //FloodFill algorithm

   for (var xoffset = -1; xoffset <= 1; xoffset++) {    //loops for all surrounding neighbours (offset)
    for (var yoffset = -1; yoffset <= 1; yoffset++) {
      var i = this.i + xoffset; //calculates xoffset
      var j = this.j + yoffset; // calculates yoffset
      if (i >=0 && i < cols && j >= 0 && j < rows) { //checks if current tile with the offset is on the board (Only counts neighbours on the board)

      var neighbour = grid[i][j];
      if (neighbour.mine) { 
        total++;    //increments the total if a neighbour is a bee
      }
     }
    }
  }
  this.noNeighbours  = total;
}

Tile.prototype.floodFill = function() { //reveals all blank tiles which are neighbours of each other

//FloodFill algorithm

   for (var xoffset = -1; xoffset <= 1; xoffset++) {    //loops for all surrounding neighbours (offset)
    for (var yoffset = -1; yoffset <= 1; yoffset++) {
      var i = this.i + xoffset; //calculates xoffset
      var j = this.j + yoffset; // calculates yoffset

      if (i >=0 && i < cols && j >= 0 && j < rows) { //checks if current tile with the offset is on the board (Only counts neighbours on the board)
        var floodCells = grid[i][j];
         if (floodCells.revealed === false) { //checks if tile is not revealed
           floodCells.reveal();
       }
      }
     }
    }
   }
  

Tile.prototype.flagTile = function() {  //changes the property of the flagged boolean to true when called
  this.flagged = true;
}

Tile.prototype.unflag = function() {  //changes the property of the flagged boolean to false when called
  this.flagged = false;
}
