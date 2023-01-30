# Mars Rover
## Guidelines
- Tech stack
  - Javascript or Typescript
  - [Node](https://nodejs.org/) and [npm](https://www.npmjs.com/)
  - [Jest](https://jestjs.io/) for running tests
- Do test-driven development
- Implement the functionality iteratively
  - It is recommended to write acceptance criteria for the requirements before starting
  - Use a tool (Google doc/Trello/Mural) to track your development tasks
- There are many solutions for this problem online but DON’T LOOK AT THEM!

## Setup
- Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
  - This lets you switch Node versions between projects
  - This project has an `.nvmrc` file with a specific version of Node
  - Run `nvm install` to get that version of node
  - After it is installed, run `nvm use` to switch to it
  - Optional but recommended: [set up shell integration to automatically switch versions based on directory](https://github.com/nvm-sh/nvm#deeper-shell-integration)
- Install dependencies: `npm install`
- Run tests: `npm run test`
  - Watch mode: `npm run test:watch
- Run the app: `npm start`

## Problem description
A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau,
which is curiously rectangular, must be navigated by the rovers so that their on-board
cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover’s position and location is represented by a combination of x and y coordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ make the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.
Assume that the square directly North from (x, y) is (x, y+1).

**Input:**
- The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.
- The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover’s position, and the second line is a series of instructions telling the rover how to explore the plateau.
- The position is made up of two integers and a letter separated by spaces, corresponding to the x and y coordinates and the rover’s orientation.
- Each rover will be finished sequentially, which means that the second rover won’t start to move until the first one has finished moving.

**Output:**
- The output for each rover should be its final coordinates and heading.

### Example
**Input:**  
5 5  
1 2 N  
LMLMLMLMM  
3 3 E  
MMRMMRMRRM

**Expected Output:**  
1 3 N  
5 1 E

### Edge cases
- Input validation
- Handle the case where a rover goes past the edge and falls off the plateau
- If rovers collide, the moving rover should push the static rover one cell in the direction of movement

### Problem extensions
- Move the rover backwards when the letter is ‘B’
- Add obstacles on the plateau
  - Rocks that block the rover from moving
  - Mines that blow up the rover
  - Aliens that move back and forth
  - Sandstorms that throw the rover in a random location within a two-unit radius
- Shoot laser at obstacles when the letter is ‘L’
- Change the turns from 90 to 45 degrees with diagonal movement
- If there are multiple rovers, make them move at the same time instead of waiting for the previous rover to finish
- Animate the whole plateau with the moving rovers on the console
- Send new inputs to the rover via the command line or a GUI
- Anything you think would be cool
