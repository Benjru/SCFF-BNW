import React, { Component } from "react";
import CatView from "../CatView";
import { allResistCards } from "../constants";

class FrontendCatController extends Component{
    state = {
        cats: [],
        currCatSelecting: 1
    };

    setCat = (inCat) => {
        if (this.state.cats.find(cat => cat.name === inCat.name)){
            // Tell user that two cats cannot have the same cat
            alert("You must select a different cat!")
        }
        else{
            const hand = this.createHand();
            this.setState((prevState) => { 
                return {
                    currCatSelecting: prevState.currCatSelecting + 1,
                    cats: [
                        ...prevState.cats, 
                        {
                            name: inCat.name,
                            homePlanet: inCat.homePlanet,
                            catNum: prevState.currCatSelecting,
                            currPlanet: inCat.homePlanet,
                            hand
                        }
                    ],
                    readyToStart: prevState.currCatSelecting === 2 ? true: false
                }
            });

            // const requestOptions = {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ catName: inCat.name })
            // };
            // fetch('http://localhost:8080/join', requestOptions);
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
        this.props.startGame(this.state.cats);
    }

    render(){
        return(
            <CatView state={this.state} createHand={this.createHand} startGame={this.startGame} setCat={this.setCat}/>
        );
    }
}

export default FrontendCatController;

