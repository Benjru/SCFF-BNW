import React, { Component } from "react";

export default class SelectCat extends Component{

    setCat = (cat) => {
        this.props.setCat(cat);
    }

    createHand = () => { // change to get hand from backend
        this.props.createHand();
    }

    startGame = () => {
        this.props.startGame(this.props.state.cats);
    }

    render() {
        return (
            <div className="catSelect">
                {console.log("SelectCat getting props state: " + JSON.stringify(this.props.state))}
                {
                    this.props.state.catSelected ? 
                    <div>
                        <p className="centeredText">Waiting for other players</p>
                        <div className="break"/>
                        {console.log("readyToStart: " + this.props.state.readyToStart)}
                        {
                            this.props.state.readyToStart?
                            <button onClick={this.startGame} className="startButton">Begin</button>:
                            <React.Fragment/>
                        }
                    </div> :
                    <React.Fragment>
                        <p className="centeredText">SELECT CAT</p> 
                        <br/>
                        <div className="catSelectContainer">
                            {
                                this.props.state.allCats.map(cat => (
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
            </div>
        );
    }
}