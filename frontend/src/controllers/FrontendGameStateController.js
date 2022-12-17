import React, { Component } from "react";
import GameView from "../views/GameView";
import {Client} from '@stomp/stompjs';
import { allPlanets } from "../constants";
import BonusEffectFactory from "./bonusEffects/BonusEffectFactory"
import ActionBodyFactory from "./actionRequests/ActionBodyFactory";

const SOCKET_URL = 'ws://localhost:8080/ws-message';

class FrontendGameStateController extends Component {
    state = {
        planets: allPlanets,
        cats: [],
        gameStarted: false,
    };

    sendPostRequest = (endpoint, body) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        };
        console.log("request body: " + JSON.stringify(body));
        fetch(`http://localhost:8080${endpoint}`, requestOptions)
            .then(res => {
                if (res.status === 400){
                    console.log(res)
                }
            })
    }

    setMyCat = (cat) => {
        this.setState({myCat: cat});
    }

    selectPlanet = (planetPosition) => {
        console.log("selected planet at position: " + planetPosition)
        let body;
        if (this.state.myCat.travelling){
            body = this.getActionRequestBody(this.state.myCat.travelType, planetPosition);
            console.log("in selectPlanet. Request body: "  + body);
            this.setState((prevState) => {
                return{
                    myCat: {
                        ...prevState.myCat,
                        travelling: false
                    },
                    planetSelected: planetPosition
                }
            });
            this.sendPostRequest("/action", body);
        }
        else if (this.state.meowssion.numToRemoveFascismFrom !== 0){
            console.log("2");
            console.log("*********" + JSON.stringify(this.state.meowssion));
            this.setState((prevState) => {
                return {
                    meowssion: {
                        ...prevState.meowssion,
                        numToRemoveFascismFrom: prevState.meowssion.numToRemoveFascismFrom - 1,
                        removeFascism: [...prevState.meowssion.removeFascism, planetPosition]
                    }
                }
            }, () => {
                this.resolveBonusEffect();
            });
        }
        else if (this.state.meowssion.teleport.catName){
            this.setState((prevState) => {
                return {
                    meowssion: {
                        ...prevState.meowssion,
                        anyCatTeleport: false,
                        teleport:{
                            ...prevState.meowssion.teleport,
                            planetPosition: planetPosition
                        }
                    }
                }
            }, () => {
                this.resolveBonusEffect();
            });
        }
        else if (this.state.meowssion.numToAddLiberationTo !== 0){
            console.log("3");
            this.setState((prevState) => {
                return {
                    meowssion: {
                        ...prevState.meowssion,
                        numToAddLiberationTo: prevState.meowssion.numToAddLiberationTo - 1,
                        liberate: [...prevState.meowssion.liberate, planetPosition]
                    }
                }
            }, () => {
                this.resolveBonusEffect();
            });
        }
    }

    resolveBonusEffect = () => {
        const bonusEffectFactory = new BonusEffectFactory();
        const bonusEffect = bonusEffectFactory.createBonusEffect(this.state.bonusEffect);
        if (bonusEffect.checkConditions(this.state)){
            let body = bonusEffect.getRequestBody(this.state);
            this.sendPostRequest("/meowssion", body);
            this.setState({
                bonusEffect: undefined,
                meowssion: {
                    numToHeal: 0,
                    heal: [],
                    numToAddLiberationTo: 0,
                    liberate: [],
                    numToRemoveFascismFrom: 0,
                    removeFascism: [],
                    anyCatTeleport: false,
                    teleport: []
                }
            })
        } 
    }

    teleportSelect = (cat) => {
        this.setState(prevState => {
            return{
                meowssion: {
                    ...prevState.meowssion,
                    anyCatTeleport: false,
                    teleport: {
                        catName: cat.name
                    }
                }
            }
        });
    }

    selectCatToHeal = (cat) => {
        console.log("HEALING");
        if (this.state.meowssion.numToHeal !== 0){
            this.setState((prevState) => {
                return {
                    meowssion: {
                        ...prevState.meowssion,
                        numToHeal: prevState.meowssion.numToHeal - 1,
                        heal: [...prevState.meowssion.heal, cat]
                    }
                }
            }, () => {
                this.resolveBonusEffect();
            }); 
        }
        else{
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
                    this.sendPostRequest("/action", body);
    
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
    }

    toggleBonusEffect = (bonusCardType) => {
        const bonusEffectFactory = new BonusEffectFactory();
        console.log("BONUS CARD TYPE: " + bonusCardType);
        console.log("CREATING BONUS EFFECT gives " + bonusEffectFactory.createBonusEffect(bonusCardType.cardId));
        let state = bonusEffectFactory.createBonusEffect(bonusCardType.cardId).toggleEffect(this.state);
        this.setState((prevState) => {
            return {
                ...prevState,
                bonusEffect: bonusCardType.cardId,
                myCat: state.myCat,
                meowssion: state.meowssion
            }
        }, () => {
            console.log("STATE: " + JSON.stringify(state));
            console.log(JSON.stringify(this.state));
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
            this.sendPostRequest("/action", body);
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

    grabAgent = () => {
        console.log("grabbing agent");
        const body = {
            playerId: this.state.myCat.playerId
        }
        this.sendPostRequest("/grabAgent", JSON.stringify(body));
    }

    // Factory maps each possible action to its corresponding Body object, returns correct action body using object
    getActionRequestBody = (actionName, requiredInfo) => {
        const actionBodyFactory = new ActionBodyFactory();
        return actionBodyFactory.createActionBody(actionName, requiredInfo).getBody(this.state);
    }

    setGameState = (resBody) => {
        console.log("/game/gameState sent: " + JSON.stringify(resBody));
        // console.log("resBody.planets: " + resBody.planets)
        resBody.planets.forEach(planet => {
            const cats = resBody.cats.filter(cat => cat.currPlanet === planet.position);
            planet.cats = cats;
        })
        // console.log("myCat name before setting: " + this.state.myCat.name);
        const myCat = resBody.cats.filter(thisCat => thisCat.name === this.state.myCat.name);
        this.setMyCat(myCat[0]);
        this.setState((prevState) => {
            return{
                ...prevState,
                resistCardDiscard: resBody.resistCardDiscard,
                galaxyNewsDiscard: resBody.galaxyNewsDiscard,
                meowssionAwardDiscard: resBody.meowssionAwardDiscard,
                currMeowssion:resBody.meowssion,
                cats: resBody.cats,
                planets: resBody.planets,
                currTurn: resBody.currTurn,
                actionsLeft: resBody.actionsLeft,
                globalFascismScale: resBody.globalFascismScale,
                meowssion: {
                    numToHeal: 0,
                    heal: [],
                    numToAddLiberationTo: 0,
                    liberate: [],
                    numToRemoveFascismFrom: 0,
                    removeFascism: [],
                    anyCatTeleport: false,
                    teleport: {}
                },
                gameStarted: true,
                
            }
        }, () => {
            if (this.state.meowssionAwardDiscard.length > 0){
                this.toggleBonusEffect(this.state.meowssionAwardDiscard[this.state.meowssionAwardDiscard.length-1]);
            }
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
                <GameView 
                    state={this.state} 
                    setGameState={this.setGameState} 
                    useAction={this.useAction} 
                    toggleBonusEffect={this.toggleBonusEffect}
                    grabAgent={this.grabAgent}
                    selectPlanet={this.selectPlanet} 
                    teleportSelect={this.teleportSelect}
                    selectCatToHeal={this.selectCatToHeal} 
                    setMyCat={this.setMyCat} 
                    travel={this.travel} 
                    heal={this.heal}/>
            </div>
        );
    }
}

export default FrontendGameStateController;

