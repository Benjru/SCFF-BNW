import React, { Component } from "react";
import GameView from "../views/GameView";
import {Client} from '@stomp/stompjs';
import { allPlanets } from "../constants";
import ResistCard_A_Body from "./actionRequests/ResistCard_A_Body";
import ResistCard_B_Body from "./actionRequests/ResistCard_B_Body";
import ResistCard_C_Body from "./actionRequests/ResistCard_C_Body";
import ResistCard_D_Body from "./actionRequests/ResistCard_D_Body";
import ResistCard_E_Body from "./actionRequests/ResistCard_E_Body";
import ResistCard_F_Body from "./actionRequests/ResistCard_F_Body";
import FightFascismBody from "./actionRequests/FightFascismBody";
import RestockBody from "./actionRequests/RestockBody";
import TravelBody from "./actionRequests/TravelBody";

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class FrontendGameStateController extends Component {
    state = {
        planets: allPlanets,
        cats: [],
        gameStarted: false,
    };
    
    
    setMyCat = (cat) => {
        this.setState({myCat: cat});
    }

    selectPlanet = (planetPosition) => {
        console.log("selected planet at position: " + planetPosition)
        let body = this.getActionRequestBody(this.state.myCat.travelType, planetPosition);
        console.log("in selectPlanet. Request body: "  + body);
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
        this.setState((prevState) => {
            return{
                myCat: {
                    ...prevState.myCat,
                    travelling: false
                },
                planetSelected: planetPosition
            }
        });
    }

    selectCatToHeal = (cat) => {
        console.log("HEALING");

        this.setState((prevState) => {
            return {
                myCat: {
                    ...prevState.myCat,
                    targets: [...prevState.myCat.targets, cat.name]
                }
            }
        }, () => {
            if (this.state.myCat.targets.length === this.state.myCat.numToHeal){
                let body = this.getActionRequestBody("heal " + this.state.myCat.numToHeal, this.state.myCat.targets);

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
                this.setState((prevState) => {
                    return{
                        myCat: {
                            ...prevState.myCat,
                            healing: false
                        }
                    }
                });
            }   
        })
    }

    // takes action, maps to correct request body, sends post request with correct body to update backend
    useAction = (action) => {
        let body;
        if (action.cardId){
            body = this.getActionRequestBody(action.name);
        } 
        else{
            body = this.getActionRequestBody(action);
        }
        if (action.name !== 'teleport' || action !== 'travel'){
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
    }

    travel = (travelType) => {
        console.log("traveling with travelType: " + travelType);
        this.setState(prevState => {
            return{
                myCat: {
                    ...prevState.myCat,
                    travelling: true,
                    travelType: travelType
                }
            }
        }, () => {
            console.log("travelType: " + this.state.myCat.travelType);
        })
    }

    heal = (numToHeal) => {
        console.log("healing " + numToHeal);
        this.setState(prevState => {
            return{
                myCat: {
                    ...prevState.myCat,
                    healing: true,
                    targets: [],
                    numToHeal: numToHeal
                }
            }
        }, () => {
            console.log("(in state) num to heal: " + numToHeal)
        })
    }

    // maps each possible action to its corresponding Body object, returns correct action body using object
    getActionRequestBody = (actionName, requiredInfo) => {
        const actionMap = new Map();
        actionMap.set('+1 liberation', new ResistCard_A_Body());
        actionMap.set('heal 1', new ResistCard_B_Body(requiredInfo));
        actionMap.set('heal 2', new ResistCard_C_Body(requiredInfo));
        actionMap.set('-2 fascists', new ResistCard_D_Body());
        actionMap.set('teleport', new ResistCard_E_Body(requiredInfo));
        actionMap.set('ears', new ResistCard_F_Body('Ears'));
        actionMap.set('paw', new ResistCard_F_Body('Paw'));
        actionMap.set('tail', new ResistCard_F_Body('Tail'));
        actionMap.set('whiskers', new ResistCard_F_Body('Whiskers'));
        actionMap.set('restock', new RestockBody());
        actionMap.set('travel', new TravelBody(requiredInfo));
        actionMap.set('fightFascism', new FightFascismBody());
        return actionMap.get(actionName).getBody(this.state);
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
        this.setMyCat(myCat[0]);
        this.setState((prevState) => {
            return{
                ...prevState,
                resistCardDiscard: resBody.resistCardDiscard,
                galaxyNewsDiscard: resBody.galaxyNewsDiscard,
                cats: resBody.cats,
                planets: resBody.planets,
                currTurn: resBody.currTurn,
                actionsLeft: resBody.actionsLeft,
                globalFascismScale: resBody.globalFascismScale,
                gameStarted: true
            }
        }, () => {
            console.log(this.state);
        }); 
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
                <GameView state={this.state} setGameState={this.setGameState} useAction={this.useAction} selectPlanet={this.selectPlanet} selectCatToHeal={this.selectCatToHeal} setMyCat={this.setMyCat} travel={this.travel} heal={this.heal}/>
            </div>
        );
    }
}

export default FrontendGameStateController;

