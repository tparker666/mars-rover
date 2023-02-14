
//done: read input
//done: create plateau
//done: create rovers
//done: move rover1, repeat for each rover
//done: report final location
//done: move rover backwards
//done: edge detection.  and what do we do when we reach an edge
//todo: multiple rovers.  push it out of the way
//todo: rotate through the rovers executing 1 instruction each rotation



const TESTFILE = '/Users/terryparker/Learning/mars-rover/src/input.txt';

const run = () => {
  console.log("Welcome to Mars!");

  let data = readInputData(TESTFILE);

  let plateau = new CreatePlateau(data);
  let rovers = createRovers(data, plateau);

  moveRovers(rovers);
 reportRovers(rovers);

};




function readInputData(filePath){
  let fs = require('fs');
  let data = fs.readFileSync(filePath, 'utf8');

  return data;
};



function howManyRovers(data){
  let dataSplit = data.toString().trim().split('\n');
  let ds2 = dataSplit[0];
  let numRovers = (dataSplit.length -1) /2;
  return numRovers;
}


function CreatePlateau(input){
  this.maxX = plateauGetMaxX(input);
  this.maxY = plateauGetMaxY(input);

  function getMaxX(){
    return this.maxX;
  }
  function getMaxY(){
    return this.maxY;
  }

  function plateauGetMaxX(input){
    let firstLine = input.split('\n',1);
    return parseInt(firstLine.toString().split(' ')[0]);
  }
  function plateauGetMaxY(input){
    let firstLine = input.split('\n',1);
    return parseInt(firstLine.toString().split(' ')[1]);
  }
}



function createRovers(data, plateau) {
  let numRovers = howManyRovers(data);
  let rovers = [];

  for (let i = 1; i <= numRovers * 2; i += 2) {
    let tmpRover = new CreateRover(data, plateau, i);
    rovers.push(tmpRover);
  }
  return rovers;
}



function CreateRover(input, plateau, roverNumber){
  this.plateauMaxX = plateau.maxX; //plateauGetMaxX(input);
  this.plateauMaxY = plateau.maxY; //plateauGetMaxY(input);
  this.atEdge = false;
  this.x = getXCoordinate(input, roverNumber);
  this.y = getYCoordinate(input, roverNumber);
  this.orientation = getOrientation(input, roverNumber);
  this.moveInstructions = getMoveInstructions(input, roverNumber);


  function getXCoordinate(input, roverNumber){
    let tmp2 = splitToRoverPosition(input,roverNumber);
    let tmp3 = tmp2[0].toString();

    return(parseInt(tmp3));
  }

  function getYCoordinate(input, roverNumber){
    let tmp2 = splitToRoverPosition(input, roverNumber);
    let tmp3 = tmp2[1].toString();

    return(parseInt(tmp3));
  }

  function getOrientation(input, roverNumber){
    let tmp2 = splitToRoverPosition(input, roverNumber);
    let tmp3 = tmp2[2].toString();

    return(tmp3);
  }

  function splitToRoverPosition(input, roverNumber){
    return (input.split('\n')[roverNumber].split(' '));
  }

  function getMoveInstructions(input, roverNumber){
    let tmp1 = input.split('\n');
    let tmp2 = tmp1[roverNumber+1].split(' ');
    let tmp3 = tmp2[0].toString();

    return(tmp3);
  }
}


 function moveRovers(rovers) {

   for (let i = 0; i < rovers.length; i++) {
     moveRover(rovers[i]);
   }
 }

function moveRover(rover){
    let instructions = rover.moveInstructions.split('');

    for (let value of instructions) {
      if (rover.atEdge)
       return
      if (value === 'L') {
        rover.orientation = turnLeft(rover.orientation);
      }
      if (value === 'R') {
        rover.orientation = turnRight(rover.orientation);
      }
      if (value === 'M') {
        moveForward(rover);
      }
      if (value === 'B'){
        moveBackward(rover);
      }
  }

  function turnLeft(direction) {
    if (direction === 'N')        return 'W';
    else if (direction === 'W')   return 'S';
    else if (direction === 'S')   return 'E';
    else if (direction === 'E')   return 'N';
  }

  function turnRight(direction) {
    if (direction === 'N')        return 'E';
    else if (direction === 'W')   return 'N';
    else if (direction === 'S')   return 'W';
    else if (direction === 'E')   return 'S';
  }

  function moveForward(rover) {
    if (rover.orientation === 'N') {
      if (rover.y === rover.plateauMaxY) {
        rover.y += 1;
        rover.atEdge = true;
      } else {
        rover.y += 1
      }
    }
    else if (rover.orientation === 'S') {
      if (rover.y === 0) {
        rover.y -= 1;
        rover.atEdge = true;
      } else {
        rover.y -= 1
      }
    }
    else if (rover.orientation === 'W') {
      if (rover.x === 0){
        rover.x -= 1;
        rover.atEdge = true;
      }
      else { rover.x -= 1}
    }
    else if (rover.orientation === 'E') rover.x += 1;
  }

  function moveBackward(rover) {
    if (rover.orientation === 'N') rover.y -= 1;
    else if (rover.orientation === 'S') rover.y += 1;
    else if (rover.orientation === 'W') rover.x += 1;
    else if (rover.orientation === 'E') rover.x -= 1;
  }


    function atWestEdge(rover){
      if (rover.x === 0)
        return true;
    }
    function atSouthEdge(rover){
      if (rover.y === 0)
        return true;
    }

}

function reportRovers(rovers){
  for (let i = 0; i < rovers.length; i++){
    report(rovers[i]);
  }
}


function report(rover){
  let roverLocation;
  if (rover.x > rover.plateauMaxX)
    roverLocation = '+' + rover.plateauMaxX + ' ';
  else
    roverLocation = rover.x + ' ';
  if (rover.y > rover.plateauMaxY)
    roverLocation += '+' + rover.plateauMaxY;
  else
      roverLocation += rover.y;
  roverLocation += ' ' + rover.orientation;
  console.log('rover location: ', roverLocation);
  return roverLocation;
}


module.exports = {CreatePlateau,
    CreateRover, readInputData, howManyRovers, moveRover, report };




run();