import React, { Component } from 'react';
import './App.css';
import {GameBoard, TurnDisplay} from './components/GameComponents';
import FrontendCatController from './controllers/FrontendCatController';

// get state from fe gamestate controller?

class GameView extends Component {

  setMyCat = (cat) => {
    this.props.setMyCat(cat);
  }

  startGame = () => {
    this.props.startGame();
  }

  setGameState = (res) => {
    this.props.setGameState(res);
  }

  useCard = (cardFromDeck) => {
    this.props.useCard(cardFromDeck)
  }

  render() {
    return (
      <div className="App">
        {
          this.props.state.gameStarted ?
          <React.Fragment>
            {console.log("this.props.state: " + JSON.stringify(this.props.state))}
              <p className='turnText'>P{this.props.state.currTurn+1}'s turn</p>
            <div className='gameViewContainer'>
              <GameBoard state={this.props.state}/>
              <TurnDisplay state={this.props.state} useCard={this.useCard} useAction={this.useAction}/>
            </div>
          </React.Fragment>:
          <FrontendCatController setMyCat={this.setMyCat} setGameState={this.setGameState} startGame={this.startGame}/>

        }
      </div>
    );
  }
}

export default GameView;