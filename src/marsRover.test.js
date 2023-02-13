
const { CreatePlateau, CreateRover, readInputData, howManyRovers, moveRover, report } = require("./marsRover");
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

  it.todo("should do something really neat");

  it("should do something", () =>{
    const value = 55;
    expect(value).toEqual(55);
  });



  it("should read input file and return it as a string", () => {

    let inputData = readInputData(TESTFILE1);

    expect (inputData).toEqual('5 5\n1 3 N\nLMLMLMMM');
  });

  it ("should return number of rovers to be used", () => {
    const input = INPUTDATA;
    expect(howManyRovers(input)).toEqual(1);
  });


  it("should create plateau and return plateau maximum x and y coordinates", () => {
    const input = INPUTDATA;

    const plateau = new CreatePlateau(input);

    expect(plateau.maxX).toEqual(5);
    expect (plateau.maxY).toEqual(5);

  });



  it("should create a rover object and set initial x & y coordinates", () => {
    const input = INPUTDATA;
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(3);

  });

  it("should create a rover object and set orientation", () => {
    const input = INPUTDATA;
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);

    expect(rover.orientation).toEqual('N');

  });

  it("should create a rover object and set instructions", () => {
    const input = INPUTDATA;
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);

    expect(rover.moveInstructions).toEqual('LMLMLMMM')

  });

//todo: fix the tests below
  it("should move rover 1 square 'S' ", () => {
  //  const input = INPUTDATA;
    const input = '5 5\n1 2 S\nM';
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(1);

   // expect(rover.moveInstructions).toEqual('LMLMLMMM')

  });

  it("should move rover 1 square 'W' ", () => {
    //  const input = INPUTDATA;
    const input = '5 5\n2 1 W\nM';
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(1);

    // expect(rover.moveInstructions).toEqual('LMLMLMMM')

  });

  it("should move rover 1 square 'N' ", () => {
    //  const input = INPUTDATA;
    const input = '5 5\n1 0 N\nM';
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(1);

    // expect(rover.moveInstructions).toEqual('LMLMLMMM')

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
  it("should stop rover when attempting to move past 'x' edge and not make any other moves", () => {
    const input = '5 5\n1 1 N\nLMMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('-1 1 W');
  });

  it("should stop rover when attempting to move past 'y' edge and not make any other moves", () => {
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
    const input = '5 5\n1 1 E\nMMMMMM';
    const plateau = new CreatePlateau(input);
    const rover = new CreateRover(input, plateau, 1);
    moveRover(rover);

    expect(report(rover)).toEqual('+5 1 E');
  });

});


