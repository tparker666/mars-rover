


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


module.exports = {
    moveRovers,
    moveRover,
};