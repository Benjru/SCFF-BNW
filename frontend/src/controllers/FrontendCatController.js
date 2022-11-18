import React, { Component } from "react";
import CatView from "../CatView";
import { allCats, allResistCards } from "../constants";
import {removeItemFromArray} from "../util/helpers";

class FrontendCatController extends Component{
    state = {
        allCats: allCats,
        cats: [],
        catSelected: false,
        currCatSelecting: 1
    };

    setMyCat = (cat) => {
        this.props.setMyCat(cat);
    }

    setCat = (inCat) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ catName: inCat.name })
        };
        fetch('http://localhost:8080/join', requestOptions)
            .then(response => {
                if (response.status === 400){
                    alert("Another player has already selected this cat!");
                }
                else if (response.status === 200){
                    this.setState((prevState) => { 
                        return {
                            allCats: removeItemFromArray(prevState.allCats, inCat),
                            catSelected: true,
                            currCatSelecting: prevState.currCatSelecting + 1,
                            cats: [
                                ...prevState.cats, 
                                {
                                    name: inCat.name,
                                    homePlanet: inCat.homePlanet,
                                    currPlanet: inCat.homePlanet
                                }
                            ],
                            readyToStart: prevState.currCatSelecting === 2 ? true: false
                        }
                    });
                    this.setMyCat(inCat);
                    
                    fetch('http://localhost:8080/gamestate')
                        .then(res => {
                            return res.json();
                        }).then(parsedRes => {
                            if (parsedRes.status === 404){
                                console.log(parsedRes);
                            }
                            else if (parsedRes.status === 200){
                                this.props.setGameState(parsedRes);
                            }
                        })
                }
            })
        
    }

    //readyToStart not working

    // createHand = () => { // change to get hand from backend
    //     const hand = [];
    //     for (let j = 0; j < 2; j++){
    //         const randomPosition = Math.floor(Math.random() * allResistCards.length);
    //         console.log(randomPosition)
    //         const card = allResistCards[randomPosition];
    //         hand.push(card);
    //     }
    //     return hand;
    // }

    // startGame = () => {
    //     this.props.startGame(this.state.cats);
    // }

    render(){
        return(
            <CatView state={this.state} setCat={this.setCat}/>
        );
    }
}

export default FrontendCatController;

