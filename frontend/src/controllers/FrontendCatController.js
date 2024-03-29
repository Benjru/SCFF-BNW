import React, { Component } from "react";
import CatView from "../views/CatView";
import { allCats } from "../constants";
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
                            if (res.status === 404){
                                console.log(res);
                                return null;
                            }
                            else if (res.ok){
                                res.json().then(body => this.props.setGameState(body));
                            }
                        })
                }
            })
        
    }

    render(){
        return(
            <CatView state={this.state} setCat={this.setCat}/>
        );
    }
}

export default FrontendCatController;

