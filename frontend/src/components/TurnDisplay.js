//FrontendGameStateController 
import React, { Component } from "react";
import {allResistCards } from "../constants";
import RestockAction from "./RestockAction";
import TravelAction from "./TravelAction";
import FightFascismAction from "./FightFascismAction";
import GrabAgent from "./GrabAgent";
import ScratchBar from "./ScratchBar";

export default class TurnDisplay extends Component { // Knows current turn and renders current cat's hand, and actions

    useAction = (cardFromDeck) => {
        if (cardFromDeck.name === 'teleport'){
            this.travel('teleport')
        }
        else if (cardFromDeck.name === 'heal 1'){
            this.heal(1);
        }
        else if (cardFromDeck.name === 'heal 2'){
            this.heal(2);
        }
        else{
            this.props.useAction(cardFromDeck);
        }
    }

    grabAgent = () => {
        this.props.grabAgent();
    }

    travel = (travelType) => {
        this.props.travel(travelType);
    }

    teleportSelect = (cat) => {
        this.props.teleportSelect(cat)
    }

    heal = (numToHeal) => {
        this.props.heal(numToHeal);
    }

    selectCatToHeal = (cat) => {
        if (this.props.state.currTurn === this.props.state.myCat.playerId){
            this.props.selectCatToHeal(cat);
        }
    }

    render(){
        console.log(this.props.state.myCat);
        //console.log("myCat hand (in TurnDisplay): " +  JSON.stringify(this.props.state.myCat.hand));
        const myCat = this.props.state.myCat;
        return(
            this.props.state.myCat.travelling?
            <div>
                <h1 className="turnText">Select planet to travel to</h1>
            </div>:
            this.props.state.myCat.healing?
            <div>
                <h1 className="turnText">Select {myCat.numToHeal} to heal</h1>
                {
                    this.props.state.cats.map(cat => {
                        if (cat.currPlanet === this.props.state.myCat.currPlanet){
                            return(
                                <div key={cat.catNum}>
                                    <img 
                                        className="selectedCat"
                                        src={`/cats/${cat.name}-cat.png`} 
                                        onClick={() => this.selectCatToHeal(cat)}
                                        alt={cat.name}
                                    />
                                </div>
                            )
                        }
                        return (
                            <React.Fragment/>
                        )
                    })
                }
            </div>:
            this.props.state.meowssion.numToRemoveFascismFrom !== 0?
            <div>
                <h1 className="turnText">Select a planet to remove fascism from</h1>
            </div>:
            this.props.state.meowssion.anyCatTeleport?
            <div>
                <h1 className="turnText">Select a cat to teleport</h1>
                {
                    this.props.state.cats.map(cat => {
                        console.log(JSON.stringify(this.props.state.meowssion));
                        return(
                            <div key={cat.catNum}>
                                <img 
                                    className="selectedCat"
                                    src={`/cats/${cat.name}-cat.png`} 
                                    onClick={() => this.teleportSelect(cat)}
                                    alt={cat.name}
                                />
                            </div>
                        )
                    })
                }
            </div>:
            this.props.state.meowssion.teleport.catName?
            <div>
                <h1 className="turnText">Select a planet to travel to</h1>
            </div>:
            this.props.state.meowssion.numToHeal !== 0?
            <div>
                <h1 className="turnText">Select {this.props.state.meowssion.numToHeal} to heal</h1>
                {
                    this.props.state.cats.map(cat => {
                        console.log("Here");
                        console.log(JSON.stringify(this.props.state.meowssion));
                        return(
                            <div key={cat.catNum}>
                                <img 
                                    className="selectedCat"
                                    src={`/cats/${cat.name}-cat.png`} 
                                    onClick={() => this.selectCatToHeal(cat)}
                                    alt={cat.name}
                                />
                            </div>
                        )
                    })
                }
            </div>:
            this.props.state.bonusEffect?
            <React.Fragment/>:
            <div className="turnContainer">
                <p className="centeredText">P{myCat.playerId+1}</p>
                <img
                    className="currentTurnCat"
                    src={`/cats/${myCat.name}-cat.png`}
                    alt={myCat}
                />
                <div className="turnHandContainer">

                    {
                        myCat.hand.map(card => {
                            let cardFromDeck;
                            let cardToFindId = card.cardId;
                            if (card.cardId === 'ResistCard_F'){
                                cardToFindId = cardToFindId + "_" + card.cardEffect;
                            }
                            cardFromDeck = allResistCards.find(resistCard => resistCard.cardId === cardToFindId);
                            let cardName = cardFromDeck.name;
                            console.log("cardName: " + cardName);
                            return(
                                <img
                                    src={`/resist_cards/${cardName}-card.jpg`}
                                    onClick={() => this.useAction(cardFromDeck)}
                                    alt={card}
                                    key={Math.random()}
                                    className="card"
                                />
                            )
                        })
                    }
                </div>
                <div className="break"/>
                <div className="turnActionContainer">
                    <RestockAction state={this.props.state} useAction={this.useAction}/>
                    <TravelAction state={this.props.state} travel={this.travel}/>
                    <FightFascismAction state={this.props.state} useAction={this.useAction}/>
                </div>
                <GrabAgent state={this.props.state} grabAgent={this.grabAgent}/>
                <ScratchBar state={this.props.state}/>
            </div>
        );
    }

}

