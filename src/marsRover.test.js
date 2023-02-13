
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



});


