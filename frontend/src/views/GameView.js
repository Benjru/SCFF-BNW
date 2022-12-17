import React, { Component } from 'react';
import '../App.css';
import TurnDisplay from '../components/TurnDisplay';
import GameBoard from '../components/GameBoard';
import FrontendCatController from '../controllers/FrontendCatController';
import GlobablFascismScale from '../components/GlobalFascismScale';
import GalaxyNews from '../components/GalaxyNewsCard';
import BonusCard from '../components/BonusCard';
import Meowssion from '../components/Meowssion';

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

  selectCatToHeal = (cat) => {
    this.props.selectCatToHeal(cat);
  }

  travel = (travelType) => {
    console.log("traveling with travelType: " + travelType);
    this.props.travel(travelType);
  }

  teleportSelect = (cat) => {
    this.props.teleportSelect(cat);
  }

  heal = (numToHeal) => {
    this.props.heal(numToHeal);
  }

  grabAgent = () => {
    this.props.grabAgent();
  }

  toggleBonusEffect = (bonusCardType) => {
    this.props.toggleBonusEffect(bonusCardType);
  }

  render() {
    return (
      <div className="App">
        {
          this.props.state.gameStarted ?
          <React.Fragment>
            {/* {console.log("this.props.state: " + JSON.stringify(this.props.state))} */}
              <p className='turnText'>{this.props.state.cats[this.props.state.currTurn].name.toUpperCase()}'S TURN</p>
            <div className='gameViewContainer'>
              <GlobablFascismScale state={this.props.state}/>
              <div className='messages'>
                <GalaxyNews state={this.props.state}/>
                <BonusCard state={this.props.state} toggleBonusEffect={this.toggleBonusEffect}/>
                <Meowssion/>
              </div>
              <GameBoard state={this.props.state} selectPlanet={this.selectPlanet}/>
              <TurnDisplay state={this.props.state} useAction={this.useAction} grabAgent={this.grabAgent} travel={this.travel} heal={this.heal} teleportSelect={this.teleportSelect} selectCatToHeal={this.selectCatToHeal}/>
            </div>
          </React.Fragment>:
          <FrontendCatController setMyCat={this.setMyCat} setGameState={this.setGameState} startGame={this.startGame}/>

        }
      </div>
    );
  }
}

export default GameView;