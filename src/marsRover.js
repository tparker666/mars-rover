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

run();


function readInputData(filePath) {

    let data = fs.readFileSync(filePath, 'utf8');

    return data;
};


function howManyRovers(data) {
    let dataSplit = data.toString().trim().split('\n');
    let ds2 = dataSplit[0];
    let numRovers = (dataSplit.length - 1) / 2;
    return numRovers;
}


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


function createRoversArray(data, plateau) {
    let numRovers = howManyRovers(data);
    let rovers = [];

    for (let i = 1; i <= numRovers * 2; i += 2) {
        let tmpRover = new CreateRover(data, plateau, i);
        rovers.push(tmpRover);
    }
    return rovers;
}


function CreateRover(input, plateau, roverNumber) {
    this.plateauMaxX = plateau.maxX; //plateauGetMaxX(input);
    this.plateauMaxY = plateau.maxY; //plateauGetMaxY(input);
    this.atEdge = false;
    this.moveCount = 0;
    this.allMovesCompleted = false;

    this.x = getXCoordinate(input, roverNumber);
    this.y = getYCoordinate(input, roverNumber);
    this.orientation = getOrientation(input, roverNumber);
    this.moveInstructions = getMoveInstructions(input, roverNumber);
    this.totalNumberOfMoves = this.moveInstructions.length;

    this.getXCoord = function (input, roverNumber) {
        let tmp = splitToRoverPosition(input, roverNumber);
        let tmp2 = tmp[0].toString();

        return (parseInt(tmp2));
    }

    function getXCoordinate(input, roverNumber) {
        let tmp2 = splitToRoverPosition(input, roverNumber);
        let tmp3 = tmp2[0].toString();

        return (parseInt(tmp3));
    }

    function getYCoordinate(input, roverNumber) {
        let tmp2 = splitToRoverPosition(input, roverNumber);
        let tmp3 = tmp2[1].toString();

        return (parseInt(tmp3));
    }

    function getOrientation(input, roverNumber) {
        let tmp2 = splitToRoverPosition(input, roverNumber);
        let tmp3 = tmp2[2].toString();

        return (tmp3);
    }

    function splitToRoverPosition(input, roverNumber) {
        return (input.split('\n')[roverNumber].split(' '));
    }

    function getMoveInstructions(input, roverNumber) {
        let tmp1 = input.split('\n');
        let tmp2 = tmp1[roverNumber + 1].split(' ');
        let tmp3 = tmp2[0].toString();
        this.totalNumberOfMoves = tmp3.length;

        return (tmp3);
    }

    function getMoveInstructionsCount(input, roverNumber) {
        let tmp1 = input.split('\n');
        let tmp2 = tmp1[roverNumber + 1].split(' ');
        let tmp3 = tmp2[0].toString();

        return (tmp3.length);
    }


}


function moveRovers(rovers) {
    // find longest move length
    // iterate over rovers until all moves are done one at a time
    let longestMoveCount = 0;
    for (let i = 0; i < rovers.length; i++) {
        if (longestMoveCount < rovers[i].totalNumberOfMoves) {
            longestMoveCount = rovers[i].totalNumberOfMoves;
        }
    }

    for (let i = 0; i < longestMoveCount; i++) {
        for (let j = 0; j < rovers.length; j++) {
            moveRover(rovers[j], 1);
        }
    }

    for (let i = 0; i < rovers.length; i++) {
        moveRover(rovers[i]);
    }
}

function moveRover(rover, ...numberOfMoves) {
    let instructions = rover.moveInstructions.split('');

    if (numberOfMoves[0] == 1) {
        let value = instructions[rover.moveCount];
        if (rover.moveCount < rover.totalNumberOfMoves)
            rover.moveCount++;
        else
            rover.allMovesCompleted = true;

        if (rover.atEdge || rover.allMovesCompleted)
            return;

        if (value === 'L') {
            rover.orientation = turnLeft(rover.orientation);
        }
        if (value === 'l') {
            rover.orientation = turnLeft45(rover.orientation);
        }
        if (value === 'R') {
            rover.orientation = turnRight(rover.orientation);
        }
        if (value === 'r')
            rover.orientation = turnRight45(rover.orientation);
        if (value === 'M') {
            moveForward(rover);
        }
        if (value === 'B') {
            moveBackward(rover);
        }
    } else {
        for (let value of instructions) {
            if (rover.atEdge || rover.allMovesCompleted)
                return;

            if (value === 'L') {
                rover.orientation = turnLeft(rover.orientation);
            }
            if (value === 'l') {
                rover.orientation = turnLeft45(rover.orientation);
            }
            if (value === 'R') {
                rover.orientation = turnRight(rover.orientation);
            }
            if (value === 'r')
                rover.orientation = turnRight45(rover.orientation);
            if (value === 'M') {
                moveForward(rover);
            }
            if (value === 'B') {
                moveBackward(rover);
            }
        }
    }

    function turnLeft(direction) {
        if (direction === 'N') return 'W';
        else if (direction === 'NW') return 'SW';
        else if (direction === 'W') return 'S';
        else if (direction === 'SW') return 'SE';
        else if (direction === 'S') return 'E';
        else if (direction === 'SE') return 'NE';
        else if (direction === 'E') return 'N';
    }

    function turnLeft45(direction) {
        if (direction === 'N') return 'NW';
        else if (direction === 'NW') return 'W';
        else if (direction === 'W') return 'SW';
        else if (direction === 'SW') return 'S';
        else if (direction === 'S') return 'SE';
        else if (direction === 'SE') return 'E';
        else if (direction === 'E') return 'NE';
        else if (direction === 'NE') return 'N';
    }

    function turnRight(direction) {
        if (direction === 'N') return 'E';
        else if (direction === 'NE') return 'SE';
        else if (direction === 'W') return 'N';
        else if (direction === 'NW') return 'NE';
        else if (direction === 'S') return 'W';
        else if (direction === 'SW') return 'NW';
        else if (direction === 'E') return 'S';
        else if (direction === 'SE') return 'SW';
    }

    function turnRight45(direction) {
        if (direction === 'N') return 'NE';
        else if (direction === 'NE') return 'E';
        else if (direction === 'W') return 'NW';
        else if (direction === 'NW') return 'N';
        else if (direction === 'S') return 'SW';
        else if (direction === 'SW') return 'W';
        else if (direction === 'E') return 'SE';
        else if (direction === 'SE') return 'S';
    }

    function moveForward(rover) {
        if (rover.orientation === 'N') {
            if (rover.y === rover.plateauMaxY) {
//        moveOne(rover, [0, 1]);  // use this to
                rover.y += 1;
                rover.atEdge = true;
            } else {
                rover.y += 1
            }
        } else if (rover.orientation === 'S') {
            if (rover.y === 0) {
                rover.y -= 1;
                rover.atEdge = true;
            } else {
                rover.y -= 1
            }
        } else if (rover.orientation === 'W') {
            if (rover.x === 0) {
                rover.x -= 1;
                rover.atEdge = true;
            } else {
                rover.x -= 1
            }
        } else if (rover.orientation === 'E') {
            if (rover.x === rover.plateauMaxX) {
                rover.x += 1;
                rover.atEdge = true;
            } else {
                rover.x += 1
            }
        } else if (rover.orientation === 'NE') {
            if (rover.x === rover.plateauMaxX || rover.y === rover.plateauMaxY) {
                rover.x += 1;
                rover.y += 1;
                rover.atEdge = true;
            } else {
                rover.x += 1;
                rover.y += 1;
            }
        } else if (rover.orientation === 'NW') {
            if (rover.x === 0 || rover.y === rover.plateauMaxY) {
                rover.x -= 1;
                rover.y += 1;
                rover.atEdge = true;
            } else {
                rover.x -= 1;
                rover.y += 1;
            }
        } else if (rover.orientation === 'SE') {
            if (rover.x === rover.plateauMaxX || rover.y === 0) {
                rover.x += 1;
                rover.y -= 1;
                rover.atEdge = true;
            } else {
                rover.x += 1;
                rover.y -= 1;
            }
        } else if (rover.orientation === 'SW') {
            if (rover.x === 0 || rover.y === 0) {
                rover.x -= 1;
                rover.y -= 1;
                rover.atEdge = true;
            } else {
                rover.x -= 1;
                rover.y -= 1;
            }
        }
    }

    function moveOne(rover, coord) {
        rover.y += coord[1];
        rover.x += coord[0];
    }


    function moveBackward(rover) {
        if (rover.orientation === 'N') rover.y -= 1;
        else if (rover.orientation === 'S') rover.y += 1;
        else if (rover.orientation === 'W') rover.x += 1;
        else if (rover.orientation === 'E') rover.x -= 1;
    }


    function atWestEdge(rover) {
        if (rover.x === 0)
            return true;
    }

    function atSouthEdge(rover) {
        if (rover.y === 0)
            return true;
    }

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
    CreateRover, createRoversArray,
    readInputData, howManyRovers, moveRovers, moveRover, reportRovers, report
};




