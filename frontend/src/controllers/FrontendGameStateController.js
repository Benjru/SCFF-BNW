import React, { Component } from "react";
import GameView from "../GameView";
import {Client} from '@stomp/stompjs';

const SOCKET_URL = 'ws://localhost:8080';

class FrontendGameStateController extends Component {
    state = {
        planets: ['cold-bath', 'dustbunny', 'fishbowl', 'frostnip', 'hairball', 'hotrock', 'laserlight', 'litterbox', 'scratchpost', 'scratchstone', 'space-vet', 'waterdish'],
        boardSquares: [],
        players: [],
        gameStarted: false
    };
    
    startGame = (players) => {
        // generate game board
        this.setState({
            players,
            gameStarted: true,
            currTurn: 1
        }, () => {
        this.setState({boardSquares:  this.createBoardSquares()})
        })
    }

    updateTurn = (turn) => {
        this.setState((prevState) => {
        return {
            currTurn: turn
        }
        });
    }

    updateHand = (playerIndex, hand) => {
        // 1. Make a shallow copy of the players arr
        let players = [...this.state.players];
        // 2. Make a shallow copy of the player
        let player = {...players[playerIndex]};
        // 3. Replace the player's hand property
        player.hand = hand;
        // 4. Put it back into our array.
        players[playerIndex] = player;
        // 5. Set the state to our new copy
        this.setState({players});
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
        const players = this.state.players;
        const player1 = players[0];
        const player2 = players[1];

        const boardSquares = [];

        for (let i = 0; i < this.state.planets.length; i++){
            //const randomPlanet = this.state.planets[Math.floor(Math.random() * Array.length)];
            const planet = this.state.planets[i];
            let playerOnSquare = "";
            let fascismLevel = 0;
            
            
            if (i%2 === 0){
                fascismLevel++;
            }
            if (player1.cat.homePlanet === planet){
                console.log("player1 home planet: " + planet); // start their cat here
                playerOnSquare = player1;
                fascismLevel++;
            }
            if (player2.cat.homePlanet === planet){
                console.log("player2 home planet: " + planet) // start their cat here
                playerOnSquare = player2;
                fascismLevel++;
            }

            const boardSquare = {
                planet: planet,
                playerOnSquare: playerOnSquare,
                fascismLevel: fascismLevel
            }
            console.log(boardSquare);
            boardSquares.push(boardSquare);
        }

        return boardSquares;

    }

    componentDidMount(){
        let onConnected = () => {
            console.log("connected");
            client.subscribe('/startGame', this.startGame());
            client.subscribe('/game/catInfo', (res)=>{
                console.log(res);
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
                <GameView state={this.state} startGame={this.startGame} updateFascismLevel={this.updateFascismLevel} updateHand={this.updateHand} updateTurn={this.updateTurn}/>
            </div>
        );
    }
}

export default FrontendGameStateController;

