//FrontendGameStateController 
import React, { Component } from "react";
import {RestockAction, TravelAction} from './FrontendCatController';
import Planet from "../components/Planet";

class GameBoard extends Component{ // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState

    state = {
        planets: ['cold-bath', 'dustbunny', 'fishbowl', 'frostnip', 'hairball', 'hotrock', 'laserlight', 'litterbox', 'scratchpost', 'scratchstone', 'space-vet', 'waterdish'],
        boardSquares: []
    }

    componentDidMount(){
        const boardSquares = this.createBoardSquares();
        this.setState({
            boardSquares
        });
    }

    createBoardSquares() {
        // generate board and set state
        const {players} = this.props;
        const player1 = players[0];
        const player2 = players[1];

        const boardSquares = [];

        for (let i = 0; i < this.state.planets.length; i++){
            //const randomPlanet = this.state.planets[Math.floor(Math.random() * Array.length)];
            const planet = this.state.planets[i];
            let boardSquare = {
                planet: planet,
                catOnSquare: null
            };
            
            if (player1.cat.homePlanet === planet){
                console.log("player1 home planet: " + planet); // start their cat here
                boardSquare = {
                    planet: planet,
                    catOnSquare: player1.cat
                };
            }
            else if (player2.cat.homePlanet === planet){
                console.log("player2 home planet: " + planet) // start their cat here
                boardSquare = {
                    planet: planet,
                    catOnSquare: player2.cat
                };
            }
            console.log(boardSquare)
            boardSquares.push(boardSquare);
        }

        return boardSquares;

    }



    render() {
        return (
            <div className="gameBoard">
                {
                    this.state.boardSquares.map(boardSquare => (
                        <div className="boardSquare" key={boardSquare.planet}>
                            {/* component should take board square */}
                            <Planet boardSquare={boardSquare}/>
                        </div>
                    ))
                }
            </div>
        );
    }
}

class TurnDisplay extends Component { // Knows current turn and renders current player's hand, and actions

    actionCount = 0;
    currTurn = 1;
    hand = this.props.players[this.currTurn-1].hand;

    updateHand = (playerIndex, hand) => {
        this.props.updateHand(playerIndex, hand)
    }

    useAction = () => {
        this.actionCount++;
        if (this.actionCount===3){ // Max actions per turn
            this.props.updateTurn();
            this.actionCount = 0;
            if (this.currTurn === 1){ //Figure out a better way to check turn
                this.currTurn = 2;
            }
            else{
                this.currTurn = 1;
            }
            this.hand = this.props.players[this.currTurn-1].hand;
            this.props.updateTurn(this.currTurn); // not that important
        }
    }

    removeItemFromArray = (array, item) => { 
        for(var i in array){
            if(array[i]===item){
                array.splice(i,1);
                i--;
            }
        }
        return array;
    }

    useCard = (card) => {
        //map card to appropriate card handling function. 
        if (this.hand.length === 0){
            alert("Your hand is empty!");
        }
        else{
            console.log("used: " + card)
            this.hand = this.removeItemFromArray(this.hand, card);
            this.props.updateHand(this.currTurn-1, this.hand);
            console.log(this.hand)
        }
        this.useAction();
    }

    render(){
        const player = this.props.players[this.currTurn-1];
        return(
            <div className="turnContainer">
                <p className="centeredText">P{player.playerNum}</p>
                <img
                    className="currentTurnCat"
                    src={`/cats/${player.cat.name}-cat.png`}
                    alt={player.cat}
                />
                <div className="turnHandContainer">
                    {player.hand.map(card => (
                        <img
                            src={`/resist_cards/${card}-card.jpg`}
                            onClick={() => this.useCard(card)}
                            alt={card}
                            key={card}
                            className="card"
                        />
                    ))}
                </div>
                <div className="break"/>
                <div className="turnActionContainer">
                    <RestockAction useAction={this.useAction} updateHand={this.updateHand} players={this.props.players} playerIndex={this.currTurn-1}/>
                    <TravelAction useAction={this.useAction}/>
                </div>
            </div>
        );
    }

}

export {GameBoard, TurnDisplay};

