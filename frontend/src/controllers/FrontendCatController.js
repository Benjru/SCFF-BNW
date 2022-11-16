import React, { Component } from "react";
import CatComponents from "../components/CatComponents"

class FrontendCatController extends Component{
    state = {
        cats: [{
            name: 'cj',
            homePlanet: 'scratchstone'
        }, 
        {
            name: 'jasper',
            homePlanet: 'fishbowl'
        }, 
        {
            name: 'nikita',
            homePlanet: 'scratchpost'
        }, 
        {
            name: 'ophelia',
            homePlanet: 'frostnip'
        }, 
        {
            name: 'pepper',
            homePlanet: 'litterbox'
        }, 
        {
            name: 'pip',
            homePlanet: 'hotrock'
        }, 
        {
            name: 'sc',
            homePlanet: 'waterdish'
        }, 
        {
            name: 'sky',
            homePlanet: 'dustbunny'
        }],
        currPlayerSelecting: 1,
        players: []
    };

    setCat = (cat) => {
        if (this.state.players.find(player => player.cat.name === cat.name)){
            // Tell user that two players cannot have the same cat
            alert("You must select a different cat!")
        }
        else{
            const hand = this.createHand();
            this.setState((prevState) => { 
                return {
                    currPlayerSelecting: prevState.currPlayerSelecting + 1,
                    players: [
                        ...prevState.players, 
                        {
                            playerNum: prevState.currPlayerSelecting,
                            cat,
                            currPlanet: cat.homePlanet,
                            hand
                        }
                    ],
                    readyToStart: prevState.currPlayerSelecting === 2 ? true: false
                }
            });
        }

    }

    //readyToStart not working

    createHand = () => { // change to get hand from backend
        const hand = [];
        for (let j = 0; j < 2; j++){
            const randomPosition = Math.floor(Math.random() * allResistCards.length);
            console.log(randomPosition)
            const card = allResistCards[randomPosition];
            hand.push(card);
        }
        return hand;
    }

    startGame = () => {
        this.props.startGame(this.state.players);
    }

    render(){
        return(
            <CatComponents state={this.state} createHand={this.createHand} startGame={this.startGame} setCat={this.setCat}/>
        );
    }
}

export default FrontendCatController;

