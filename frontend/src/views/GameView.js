import React, { Component } from 'react';
import '../App.css';
import {GameBoard, TurnDisplay} from '../components/GameComponents';
import FrontendCatController from '../controllers/FrontendCatController';
import GlobablFascismScale from '../components/GlobalFascismScale';

// get state from fe gamestate controller?

class GameView extends Component {

  // This syntax is necessary to pass methods down to child components, but the view is not calling these

  setMyCat = (cat) => {
    this.props.setMyCat(cat);
  }

  startGame = () => {
    this.props.startGame();
  }

  setGameState = (res) => {
    this.props.setGameState(res);
  }

  useAction = (action) => {
    this.props.useAction(action);
  } 

  selectPlanet = (planetPosition) => {
    this.props.selectPlanet(planetPosition);
  }

  travel = (travelType) => {
    console.log("traveling with travelType: " + travelType);
    this.props.travel(travelType);
  }

  render() {
    return (
      <div className="App">
        {
          this.props.state.gameStarted ?
          <React.Fragment>
            {console.log("this.props.state: " + JSON.stringify(this.props.state))}
              <p className='turnText'>{this.props.state.cats[this.props.state.currTurn].name.toUpperCase()}'S TURN</p>
            <div className='gameViewContainer'>
              <GlobablFascismScale state={this.props.state}/>
              <GameBoard state={this.props.state} selectPlanet={this.selectPlanet}/>
              <TurnDisplay state={this.props.state} useAction={this.useAction} travel={this.travel}/>
            </div>
          </React.Fragment>:
          <FrontendCatController setMyCat={this.setMyCat} setGameState={this.setGameState} startGame={this.startGame}/>

        }
      </div>
    );
  }
}

export default GameView;