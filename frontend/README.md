                                                                            Frontend: Space Cats Fight Fascism


***************************************************************************              TO RUN              ****************************************************************

To run the frontend, NodeJS must be installed. It can be installed here: https://nodejs.org/en/download/

Once this is installed navigate to the frontend folder, and run:
                                                                npm install
                                                                npm start

This will install the necessary packages, and then run the start script specified in package.json. 


***************************************************************************             INFO                 ******************************************************************

A lot has changed in the frontend from MS2, since React uses Components to render its view. We were not really specifying these components in our UML previously. Additionally, the abstract ActionBody class was created and implemented by every other class in the actionRequests folder (all new), in order to eliminate a large switch statement that was being used to build a request body depending on a given action. (More on this in FrontendGameStateController section).

The frontend is written in Javascript, using the React library. 

The main motivation behind this is that React allows us to create dynamic components and display them using render() functions that return JSX (an extension to the Javascript language that allows us to write HTML elements in Javascript and add them to the DOM easily).

////////////////////////// Components:


Players: 

This component displays the cats that the players choose in the selection screen. This is done by mapping through the players array, and returning JSX elements for each player's cat containing an image of the player's chosen cat, and text labelling the image with P{1, 2, ...}.


** Note: Essentially, the Planet and FascismBar components are helpers for the GameBoard component which generates the GameBoard. The GameBoard component renders each board square into a grid, and the logic for rendering the planet image is delegated to the Planet component, while the logic for rendering the FascismBar for a given planet is delegated to the FascismBar component. 

Planet:

This component displays an individual planet. Each square on the board contains a Planet, and a FascismBar (see below). The GameBoard component iterates through the board square data that is passed from the backend. Each boardSquare is passed to the Planet component, which will then access the boardSquare's planet attribute and render the corresponding planet image, as well as the cat that is currently on the planet should there be one.


FascismBar:

This component displays an individual fascism bar. Each square on the board contains a Planet (See above), and a FascismBar. The GameBoard component iterates through the board square data that is passed from the backend. Each boardSquare is passed to the FascismBar component to be rendered. The FascismBar does this rendering by accessing the given boardSquare's fascismLevel attribute, and creating an array of length 4. If the fascismLevel is negative, the planet has liberation tokens on it, so we add |fascismLevel| orange squares (JSX elements) to our array, and fill the rest of the array with empty squares. Otherwise if the fascismLevel is positive, the planet has fascism tokens on it, so we add fascismLevel blue squares (JSX elements) to our array, and fill the rest of the array with empty squares. We then can render our array.

ScratchBar and GlobalFascismScale: Similar functionaliy to FascismBar, which changed CSS. GlobalFascismScale also provides mapping for galaxy news card messages, since the cards that are drawn are return as 'GalaxyCard_A', 'GalaxyCard_B', ...


TurnDisplay: displays a player's cat card, action buttons, scratches, hand. (Everything related to a turn).

////////////////////////// Controllers:

The controllers have states. When states are updated, the corresponding component is automatically re-rendered. This makes it relatively easy to recieve data from the backend, and update our states and View accordingly.


//// FrontendCatController: 

Responsible for the SelectCat component. Cat selection happens exclusively in the frontend. When a cat is selected, a post request is made to the /join endpoint in the backend.


//// FrontendGameStateController:

Manages the game in the frontend. When two cats join, the gamestate is automatically sent to the FrontendGameStateController using WebSockets, which then re-renders the View components. 

When actions are taken, the useAction function from this controller is called. Since each action requires its own specific request body, the useAction function uses the getActionRequestBody function which maps an actionName to it's corresponding ActionBody instance, and gets the request body. This was done in order to eliminate a large switch statement.

Travelling works slightly differently, and this action is taken in the selectPlanet function since the backend cannot perform the action until a user has selected a planet.

