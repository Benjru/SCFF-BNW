import React, { Component } from "react";
import GameView from "../GameView";
import {Client} from '@stomp/stompjs';
import { allPlanets } from "../constants";

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class FrontendGameStateController extends Component {
    state = {
        planets: allPlanets,
        boardSquares: [],
        cats: [],
        gameStarted: false
    };
    
    // startGame = () => {
    //     // // generate game board
    //     // this.setState({
    //     //     cats,
    //     //     gameStarted: true,
    //     //     currTurn: 1
    //     // }, () => {
    //     // this.setState({boardSquares:  this.createBoardSquares()})
    //     // })
    //     // // fetch('http://localhost:8080/gamestate')
    //     this.setState({
    //         gameStarted: true,
    //     });
    // }
    setMyCat = (cat) => {
        this.setState({myCat: cat});
    }

    updateTurn = (turn) => {
        this.setState((prevState) => {
        return {
            currTurn: turn
        }
        });
    }

    updateHand = (catIndex, hand) => {
        // 1. Make a shallow copy of the cats arr
        let cats = [...this.state.cats];
        // 2. Make a shallow copy of the cat
        let cat = {...cats[catIndex]};
        // 3. Replace the cat's hand property
        cat.hand = hand;
        // 4. Put it back into our array.
        cats[catIndex] = cat;
        // 5. Set the state to our new copy
        this.setState({cats});
    }

    updateFascismLevel = (boardSquareIndex, fascismLevel) => {
        let boardSquares = [...this.state.boardSquares];
        let boardSquare = {...this.state.boardSquares[boardSquareIndex]};

        boardSquare.fascismLevel = fascismLevel;
        boardSquares[boardSquareIndex] = boardSquare;

        this.setState({boardSquares: boardSquares});
    }

    
    createBoardSquares() {
        // generate board and set state
        const cats = this.state.cats;
        const cat1 = cats[0];
        const cat2 = cats[1];

        const boardSquares = [];

        for (let i = 0; i < this.state.planets.length; i++){
            //const randomPlanet = this.state.planets[Math.floor(Math.random() * Array.length)];
            const planet = this.state.planets[i];
            let catOnSquare = "";
            let fascismLevel = 0;
            
            
            if (i%2 === 0){
                fascismLevel++;
            }
            if (cat1.homePlanet === planet){
                console.log("cat1 home planet: " + planet); // start their cat here
                catOnSquare = cat1;
                fascismLevel++;
            }
            if (cat2.homePlanet === planet){
                console.log("cat2 home planet: " + planet) // start their cat here
                catOnSquare = cat2;
                fascismLevel++;
            }

            const boardSquare = {
                planet: planet,
                catOnSquare: catOnSquare,
                fascismLevel: fascismLevel
            }
            console.log(boardSquare);
            boardSquares.push(boardSquare);
        }

        return boardSquares;

    }

    setGameState = (resBody) => {
        console.log("/game/gameState sent: " + resBody);
        console.log("resBody.planets: " + resBody.planets)
        resBody.planets.forEach(planet => {
            const cats = resBody.cats.filter(cat => cat.currPlanet === planet.position);
            planet.cats = cats;
        })
        console.log("myCat name before setting: " + this.state.myCat.name);
        const myCat = resBody.cats.filter(thisCat => thisCat.name === this.state.myCat.name);
        this.setMyCat(myCat);
        this.setState({
            resistCardDiscard: resBody.resistCardDiscard,
            galaxyNewsDiscard: resBody.galaxyNewsDiscard,
            cats: resBody.cats,
            planets: resBody.planets,
            currTurn: resBody.currTurn,
            actionsLeft: resBody.actionsLeft,
            globalFascismScale: resBody.globalFascismScale,
            gameStarted: true
        }, () => {
            console.log(this.state);
        }); // need a planet to know if a cat is on it
    }

    componentDidMount(){
        let onConnected = () => {
            console.log("connected");
            // client.subscribe('/startGame', this.startGame());
            // client.subscribe('/game/catInfo', (res)=>{
            //     console.log(res);
            // });
            client.subscribe("/game/gameState", (res) => {
                if (res.body && this.state.myCat){
                    this.setGameState(JSON.parse(res.body));
                }
                else{
                    console.log("No response");
                }
            });
        }

        let onDisconnected = () => {
            console.log("disconnected");
        }
      
        const client = new Client({
            brokerURL: SOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: onConnected,
            onDisconnect: onDisconnected
        });
        client.activate();
    }

    render(){
        return (
            <div>
                <GameView state={this.state} setGameState={this.setGameState} setMyCat={this.setMyCat}/>
            </div>
        );
    }
}

export default FrontendGameStateController;

