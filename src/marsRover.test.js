
const { CreatePlateau, CreateRover, createRoversArray, readInputData,
  howManyRovers, moveRovers, moveRover, reportRovers, report } = require("./marsRover");
// const { CreateRover } = require("./marsRover");


require("./marsRover.js");


describe("marsRover", () => {

  const INPUTDATA ='5 5\n1 3 N\nLMLMLMMM'
  const BADINPUTDATA = '5 5\n1 3 N\nLMMLMLMM'
  const PLATEAUX = '5';
  const PLATEAUY = '5';
  const ROVERX = '1';
  const ROVERY = '3';
  const ROVERORIENTATION = 'N';
  const ROVERMOVES = 'LMLMLMMM';
  const TESTFILE1 = '/Users/terryparker/Learning/mars-rover/src/test.txt';

  // it.todo("should do something really neat");
  //
  // it("should do something", () =>{
  //   const value = 55;
  //   expect(value).toEqual(55);
  // });

it("should do full end to end", () => {
  let inputData = readInputData(TESTFILE1);
  let plateau = new CreatePlateau(inputData);
  let rovers = createRoversArray(inputData, plateau);
  moveRovers(rovers);
  let finalReport = reportRovers(rovers);

  expect(finalReport).toEqual("3 2 E\n");

})

  it("should read input file and return it as a string", () => {

    let inputData = readInputData(TESTFILE1);

    expect (inputData).toEqual('5 5\n1 3 N\nLMLMLMMM');
  });

  it ("should return number of rovers to be used", () => {
    const input = '5 5\n1 3 N\nLMLMLMMM';  //'5 5\n1 3 N\nLMLMLMMM'
    expect(howManyRovers(input)).toEqual(1);
  });


  it("should create plateau and return plateau maximum x and y coordinates", () => {
    const input = '5 5\n1 3 N\nLMLMLMMM';
    const plateau = new CreatePlateau(input);

    expect(plateau.maxX).toEqual(5);
    expect (plateau.maxY).toEqual(5);

  });



  it("should create a rover object and set initial x & y coordinates", () => {
    const input = '5 5\n1 3 N\nLMLMLMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(3);

  });

  it("should create a rover object and set orientation", () => {
    const input = '5 5\n1 3 N\nLMLMLMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);

    expect(rover.orientation).toEqual('N');

  });

  it("should create a rover object and set instructions", () => {
    const input = '5 5\n1 3 N\nLMLMLMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    const roverX = rover.getXCoord(input, 1);

    expect(rover.moveInstructions).toEqual('LMLMLMMM')

  });


  it("should move rover 1 square 'S' ", () => {
  //  const input = INPUTDATA;
    const input = '5 5\n1 2 S\nM';
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(1);

 });

  it("should move rover 1 square 'W' ", () => {
    //  const input = INPUTDATA;
    const input = '5 5\n2 1 W\nM';
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(1);

  });

  it("should move rover 1 square 'N' ", () => {
    //  const input = INPUTDATA;
    const input = '5 5\n1 0 N\nM';
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(1);


  });

  it("should report rovers final location ", () => {
    const input = INPUTDATA;
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('3 2 E');
  });


  it("should move rover backwards when a 'B' instruction is found", () =>{
//    const input = INPUTDATA;
    const input = '5 5\n1 1 N\nB';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('1 0 N');
  });

  it("should move rover forward and backward ", () =>{
//    const input = INPUTDATA;
    const input = '5 5\n1 1 N\nLMLMLMBRB';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('0 1 S');
  });

  it("should move rover forward and backward test 2", () =>{
//    const input = INPUTDATA;
    const input = '5 5\n1 1 N\nLMLMLMRB';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('1 1 S');
  });

  //todo test for edge
  it("should stop rover when attempting to move past 0 'x' edge and not make any other moves", () => {
    const input = '5 5\n1 1 N\nLMMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('-1 1 W');
  });

  it("should stop rover when attempting to move past 0 'y' edge and not make any other moves", () => {
    const input = '5 5\n1 1 N\nLLMMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('1 -1 S');
  });

  it("should stop rover when attempting to move past max 'y' edge and not make any other moves", () => {
    const input = '5 5\n1 1 N\nMMMMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('1 +5 N');
  });

  it("should stop rover when attempting to move past max 'x' edge and not make any other moves", () => {
    const input = '5 5\n1 1 E\nMMMMML';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('+5 1 E');
  });

  it("should turn rover 45 degrees left when a lower case 'l' is the command", () => {
    const input = '5 5\n2 2 NE\nl';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)). toEqual('2 2 N');
  });

  it("should turn rover 45 degrees RIGHT when a lower case 'r' is the command", () => {
    const input = '5 5\n2 2 E\nr';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)). toEqual('2 2 SE');
  });

  it("should move rover at 45 degrees to new location", () => {
    const input = '5 5\n2 2 NE\nM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)). toEqual('3 3 NE');
  });

  it("should rotate right 45 degrees 4 times", () => {
    const input = '5 5\n2 2 N\nrrrr';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)). toEqual('2 2 S');
  })

  it("should move around the board.  0 0 to 5 5", () => {
    const input = '5 5\n0 0 N\nRMMMMMLMMMMMlllMMMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)). toEqual('0 0 SW');
  })

});


