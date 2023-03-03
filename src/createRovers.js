


function howManyRovers(data) {
    let dataSplit = data.toString().trim().split('\n');
    let ds2 = dataSplit[0];
    let numRovers = (dataSplit.length - 1) / 2;
    return numRovers;
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


module.exports = {
    CreateRover, createRoversArray,
    howManyRovers
};