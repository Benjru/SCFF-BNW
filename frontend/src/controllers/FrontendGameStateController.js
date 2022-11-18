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

    

    useCard = (cardFromDeck) => {
        let cat = this.state.cats[this.state.currTurn]
        let planet = this.state.planets.filter(aPlanet => aPlanet.position === cat.currPlanet);

        console.log("logging cat: " + JSON.stringify(cat));
        console.log("logging cat.currPlanet: " + JSON.stringify(cat.currPlanet));
        console.log("logging this.state.planets.position: " + JSON.stringify(planet.position));
        let body = {
            playerId: cat.playerId,
            planetPosition: -1,
            cardName: cardFromDeck.name,
            actionName: 'playCard',
            targetCats: null
        };
        if (cardFromDeck.cardId === 'ResistCard_A'){
            body.planetPosition = planet.position;
        }
        else if (cardFromDeck.cardId === 'ResistCard_B'){
            body.targetCats = [cat.name];
        }
        else if (cardFromDeck.cardId === 'ResistCard_C'){
            body.targetCats = [cat.name, cat.name];
        }
        else if (cardFromDeck.cardId === 'ResistCard_D'){
            body.planetPosition = planet.position;
        }
        // else if (cardFromDeck.cardId === 'ResistCard_E'){ 
        //     body.planetPosition = planet.position;
        // }
        else if (cardFromDeck.cardId === 'ResistCard_F_EARS'){
            body.symbol = 'EARS';
            body.planetPosition = planet.position;
        }
        else if (cardFromDeck.cardId === 'ResistCard_F_PAW'){
            body.symbol = 'PAW'
            body.planetPosition = planet.position; 
        }
        else if (cardFromDeck.cardId === 'ResistCard_F_TAIL'){
            body.symbol = 'TAIL'
            body.planetPosition = planet.position;
        }
        else if (cardFromDeck.cardId === 'ResistCard_F_WHISKERS'){
            body.symbol = 'WHISKERS'
            body.planetPosition = planet.position;
        }
        body = JSON.stringify(body);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        };
        console.log("request body: " + body);
        fetch("http://localhost:8080/action", requestOptions)
            .then(res => {
                if (res.status === 400){
                    console.log(res)
                }
            })
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
                <GameView state={this.state} setGameState={this.setGameState} useCard={this.useCard} setMyCat={this.setMyCat}/>
            </div>
        );
    }
}

export default FrontendGameStateController;

