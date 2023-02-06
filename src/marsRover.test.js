
const { CreatePlateau } = require("./marsRover");
const { CreateRover } = require("./marsRover");
const { CreateGame } = require("./marsRover")
require("./marsRover.js");



describe("marsRover", () => {

  const INPUTDATA ='5 5\n1 3 N\nLMLMLMMM'
  const PLATEAUX = '5';
  const PLATEAUY = '5';
  const ROVERX = '1';
  const ROVERY = '3';
  const ROVERORIENTATION = 'N';
  const ROVERMOVES = 'LMLMLMMM';
  const TESTFILE1 = '/Users/terryparker/Learning/mars-rover/src/input.txt';

  it.todo("should do something really neat");

  it("should do something", () =>{
    const value = 55;

    expect(value).toEqual(55);
  });



  it("should read input file and return it as a string", () => {

    let inputData = readInputData(TESTFILE1);

    expect (inputData).toEqual('5 5\n1 3\nLMLMLMM');
  });



  it("should create plateau and return plateau maximum x and y coordinates", () => {
    const input = INPUTDATA;

    const plateau = new CreatePlateau(input);

    expect(plateau.maxX).toEqual(5);
    expect (plateau.maxY).toEqual(5);

  });

  it ("should return number of rovers to be used", () => {
    const input = INPUTDATA;
    expect(howManyRovers(input).toEqual(1));
  });

  it("should create a rover object and set initial x & y coordinates", () => {
    const input = INPUTDATA;
    const plateau = new CreatePlateau(input);

    const rover = new CreateRover(input, plateau, 1);

    expect(rover.x).toEqual(1);
    expect(rover.y).toEqual(3);
    expect(rover.orientation).toEqual('N');
    expect(rover.moveInstructions).toEqual('LMLMLMMM')

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


});


