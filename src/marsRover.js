//todo list
//done: read input
//done: create plateau
//done: create rovers
//done: move rover1, repeat for each rover
//done: report final location
//done: move rover backwards
//done: edge detection.  and what do we do when we reach an edge
//done: 45 degree turns. 'l' and 'r'.  fix moves for this too.
//todo: multiple rovers at same coordinates.  moving rover to push stationary rover out of the way
//todo: rotate through the rovers executing 1 instruction round robin style

const { createRoversArray } = require('./createRovers');
const { moveRovers } = require('./moveRovers');

let fs = require('fs');

const TESTFILE = '/Users/terryparker/Learning/mars-rover/src/input.txt';

const run = () => {
    console.log("Welcome to Mars!");

    let data = readInputData(TESTFILE);

    let plateau = new CreatePlateau(data);
    let rovers = createRoversArray(data, plateau);

    moveRovers(rovers);
    let finalReport = reportRovers(rovers);

    console.log(finalReport);

};

// run();


function readInputData(filePath) {

    let data = fs.readFileSync(filePath, 'utf8');

    return data;
};




function CreatePlateau(input) {
    this.maxX = plateauGetMaxX(input);
    this.maxY = plateauGetMaxY(input);

    function getMaxX() {
        return this.maxX;
    }

    function getMaxY() {
        return this.maxY;
    }

    function plateauGetMaxX(input) {
        let firstLine = input.split('\n', 1);
        return parseInt(firstLine.toString().split(' ')[0]);
    }

    function plateauGetMaxY(input) {
        let firstLine = input.split('\n', 1);
        return parseInt(firstLine.toString().split(' ')[1]);
    }

//  return (getMaxX, getMaxY, this.maxX, this.maxY);  // may not need the return. research
}



function reportRovers(rovers) {
    let finalReport = '';
    for (let i = 0; i < rovers.length; i++) {
        finalReport += report(rovers[i]) + '\n';
    }
    return finalReport;
}


function report(rover) {
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


module.exports = {
    CreatePlateau,
 //   CreateRover,
    createRoversArray,
    readInputData,
 //   howManyRovers,
    moveRovers,
//    moveRover,
    reportRovers,
    report
};




