//FrontendCatController 
import React, { Component } from "react";
import Players from "../components/Players";
import { allResistCards } from "../constants";

class SelectCat extends Component{

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
                            hand
                        }
                    ],
                    readyToStart: prevState.currPlayerSelecting === 2 ? true: false
                }
            });
        }

    }

    createHand = () => { // change to get hand from backend
        const hand = [];
        for (let j = 0; j < 3; j++){
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

    render() {
        return (
            <div className="catSelect">
                {
                    this.state.readyToStart ? 
                    <div>
                        <p className="centeredText">Let your fight begin</p>
                        <div className="break"/>
                        <button onClick={this.startGame} className="startButton">Begin</button>
                    </div> :
                    <React.Fragment>
                        <p className="centeredText">PLAYER {this.state.currPlayerSelecting}</p> 
                        <br/>
                        <div className="catSelectContainer">
                            {
                                this.state.cats.map(cat => (
                                    <img 
                                        onClick={() => this.setCat(cat)}
                                        key={cat.name}
                                        className="cat"
                                        src={`/cats/${cat.name}-cat.png`} 
                                        alt={cat}
                                    />
                                ))
                            }
                        </div>
                    </React.Fragment>
                }
                <div className="break"/>
                <Players players={this.state.players}/>
            </div>
        );
    }
}

//Actions, click card to fight fascism

class RestockAction extends Component{

    restock = () => { // change to API call
        let hand = this.props.players[this.props.playerIndex].hand;
        if (hand.length === 3){
            alert("You cannot restock");
        }
        else{
            while (hand.length < 3){
                const randomPosition = Math.floor(Math.random() * allResistCards.length);
                console.log(randomPosition)
                const card = allResistCards[randomPosition];
                hand.push(card);
                this.props.updateHand(this.props.playerIndex, hand)
            }
            this.props.useAction();
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.restock} className="actionButton">Restock</button>
            </div>
        );
    }
}

class TravelAction extends Component{

    travel = () => { // change to API call
        console.log("traveling");
        this.props.useAction();
    }

    render(){
        return(
            <div>
                <button onClick={this.travel} className="actionButton">Travel</button>
            </div>
        );
    }
}

export {SelectCat, RestockAction, TravelAction};