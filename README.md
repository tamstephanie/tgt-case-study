# Case Study for Target TTS Recruiting

## Overview

**Main Goal**: Build an application that provides functionality similar to https://www.metrotransit.org/nextrip

**Requirements**
- The user should be able to select a bus route from a list of available routes
- The user should be able to select a direction for the bus route
- The user should be able to view the the stops for a given route and direction
- The user should be able to click the browser's forward and back buttons and the application should reasonably respond

## Tech Stack

The main technologies used in this application are as follows:
- ReactJS - Relatively popular, well-maintained, and documented library for creating responsive and reactive user interfaces
- Material UI - Modern styling of components
- Jest - Works well with React to test components
- Webpack & Babel - Transpiler & bundler for the project

## Instructions
The following sections detail the instructions to build and run the project, as well as run any tests.
The main set of instructions, common to both are as follows:

### Building & Running the Application
To build and run the app, follow these steps:
1. Navigate to `tgt-case-study/src/`
2. Install necessary packages to run the project by running `npm install`
3. Run `npm run prod` to build the production version of the application. Otherwise, run `npm run dev` to build the development version
4. Navigate to http://localhost:8080/
5. Begin using the app! (Note that the only two pages that actually display content are "NexTrip" and "Lost & Found")

### Running Tests
Test-driven development (TDD) is a valuable approach when developing code. TDD help the developer consider the various scenarios and associated behavior that is expected of the component (or class, if we're speaking generally). Regardless, unit tests and integration tests are important because they can prove that the code works without needing a fully-functional and running application.

To actually run the tests in this project, follow these steps:
1. Navigate to `tgt-case-study/src/`
2. If packages have not already been installed, run `npm install`
3. Type `npm run test` or `npm test` and press 'Enter'
4. If no tests immediatey run, type 'a' and press 'Enter' to run all tests
5. Tests should run and pass (there is one exception currently to that)

## Additional Notes

### Assumptions Made During Development

- No sorting should be needed since the API will return data in the desired sorted order
- The application should be scalable, so components were designed and implmented with that in mind
- The design of the current NexTrip user interface is clean, simple, and easy for users, so there's no reason to make drastic changes to the user interface
- The application is meant for a desktop web browser; thus there were no optimizations built in for a mobile version
