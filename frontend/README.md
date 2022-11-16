Frontend: Space Cats Fight Fascism

The frontend is written in Javascript, using the React library. 

The main motivation behind this is that React allows us to create dynamic components and display them using render() functions that return JSX (an extension to the Javascript language that allows us to write HTML elements in Javascript and add them to the DOM easily).

////////////////////////// Components:


Players: 

This component displays the cats that the players choose in the selection screen. This is done by mapping through the players array, and returning JSX elements for each player's cat containing an image of the player's chosen cat, and text labelling the image with P{1, 2, ...}.


** Note: Essentially, the Planet and FascismBar components are helpers for the GameBoard component which generates the GameBoard. The GameBoard component renders each board square into a grid, and the logic for rendering the planet image is delegated to the Planet component, while the logic for rendering the FascismBar for a given planet is delegated to the FascismBar component. 

Planet:  *** Probably wanna combine board square and planet

This component displays an individual planet. Each square on the board contains a Planet, and a FascismBar (see below). The GameBoard component iterates through the board square data that is passed from the backend. Each boardSquare is passed to the Planet component, which will then access the boardSquare's planet attribute and render the corresponding planet image, as well as the cat that is currently on the planet should there be one.


FascismBar:

This component displays an individual fascism bar. Each square on the board contains a Planet (See above), and a FascismBar. The GameBoard component iterates through the board square data that is passed from the backend. Each boardSquare is passed to the FascismBar component to be rendered. The FascismBar does this rendering by accessing the given boardSquare's fascismLevel attribute, and creating an array of length 4. If the fascismLevel is negative, the planet has liberation tokens on it, so we add |fascismLevel| orange squares (JSX elements) to our array, and fill the rest of the array with empty squares. Otherwise if the fascismLevel is positive, the planet has fascism tokens on it, so we add fascismLevel blue squares (JSX elements) to our array, and fill the rest of the array with empty squares. We then can render our array.



////////////////////////// Controllers:

The controllers have states. When states are updated, the corresponding component is automatically re-rendered. This makes it relatively easy to recieve data from the backend, and update our states and View accordingly.


//// FrontendCatController: 

Responsible for the SelectCat component, and the RestockAction, TravelAction, and FightFascismAction components. 

SelectCat: Displays selection screen by mapping through all cats, and creating JSX elements with their corresponding images in the correct layout. SelectCat must know the current turn in order to update.... 

