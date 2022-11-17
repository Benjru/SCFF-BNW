import React, { Component } from 'react';
import './App.css';
import {GameBoard, TurnDisplay} from './controllers/ComponentController';
import FrontendCatController from './controllers/FrontendCatController';

// get state from fe gamestate controller?

class GameView extends Component {

  updateFascismLevel = (boardSquareIndex, fascismLevel) => {
    this.props.updateFascismLevel(boardSquareIndex, fascismLevel);
  }

  updateTurn = (turn) => {
    this.props.updateTurn(turn);
  }

  updateHand = (playerIndex, hand) => {
    this.props.updateHand(playerIndex, hand);
  }

  startGame = (players) => {
    this.props.startGame(players);
  }


  render() {
    return (
      <div className="App">
        {
          this.props.state.gameStarted ?
          <React.Fragment>
              <p className='turnText'>P{this.props.state.currTurn}'s turn</p>
            <div className='gameViewContainer'>
              <GameBoard players={this.props.state.players} boardSquares={this.props.state.boardSquares} updateFascismLevel={this.updateFascismLevel}/>
              <TurnDisplay players={this.props.state.players} boardSquares={this.props.state.boardSquares} updateTurn={this.updateTurn} updateHand={this.updateHand.bind(this.props)} updateFascismLevel={this.updateFascismLevel}/>
            </div>
          </React.Fragment>:
          <FrontendCatController startGame={this.startGame}/>

        }
      </div>
    );
  }
}

export default GameView;