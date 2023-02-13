

//console.log();

//const fs = require("fs");
const TESTFILE = '/Users/terryparker/Learning/mars-rover/src/input.txt';

const run = () => {
  console.log("Welcome to Mars!");

  let data = readInputData(TESTFILE);

  let plateau = new CreatePlateau(data);
  let numRovers = howManyRovers(data);
  let rovers = [];

  for (let i = 1; i <= numRovers*2; i+=2){
    let tmpRover = new CreateRover(data, plateau, i);
    rovers.push(tmpRover);

  }

  for (let i = 0; i < rovers.length; i++){
    moveRover(rovers[i]);
  }

  for (let i = 0; i < rovers.length; i++){
    report(rovers[i]);
  }
let x = 1;





  //todo: read input
  //todo: create plateau
  //todo: create rovers
  //todo: move rover1, repeat for each rover
  //todo: report final location




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





function CreateRover(input, plateau, roverNumber){
  this.plateauMaxX = plateau.maxX; //plateauGetMaxX(input);
  this.plateauMaxY = plateau.maxY; //plateauGetMaxY(input);
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

function moveRover(rover){
    let instructions = rover.moveInstructions.split('');

    for (let value of instructions) {
      if (value === 'L') {
        rover.orientation = turnLeft(rover.orientation);
      }
      if (value === 'R') {
        rover.orientation = turnRight(rover.orientation);
      }
      if (value === 'M') {
        moveForward(rover);
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
    if (rover.orientation === 'N')        rover.y += 1;
    else if (rover.orientation === 'S')   rover.y -= 1;
    else if (rover.orientation === 'W')   rover.x -= 1;
    else if (rover.orientation === 'E')   rover.x += 1;
  }
}

function report(rover){
  let roverLocation = rover.x +' '+rover.y + ' ' + rover.orientation;
  console.log('rover location: ', roverLocation);
  //rover.x, ' ', rover.y, ' ',      rover.orientation);
  return roverLocation;
}


module.exports = {CreatePlateau,
    CreateRover, readInputData, howManyRovers, moveRover, report };




//run();