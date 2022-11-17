import React, { Component } from 'react';
import './App.css';
import {GameBoard, TurnDisplay} from './components/GameComponents';
import FrontendCatController from './controllers/FrontendCatController';

// get state from fe gamestate controller?

class GameView extends Component {

  updateFascismLevel = (boardSquareIndex, fascismLevel) => {
    this.props.updateFascismLevel(boardSquareIndex, fascismLevel);
  }

  updateTurn = (turn) => {
    this.props.updateTurn(turn);
  }

  updateHand = (catIndex, hand) => {
    this.props.updateHand(catIndex, hand);
  }

  startGame = (cats) => {
    this.props.startGame(cats);
  }


  render() {
    return (
      <div className="App">
        {
          this.props.state.gameStarted ?
          <React.Fragment>
              <p className='turnText'>P{this.props.state.currTurn}'s turn</p>
            <div className='gameViewContainer'>
              <GameBoard cats={this.props.state.cats} boardSquares={this.props.state.boardSquares} updateFascismLevel={this.updateFascismLevel}/>
              <TurnDisplay cats={this.props.state.cats} boardSquares={this.props.state.boardSquares} updateTurn={this.updateTurn} updateHand={this.updateHand.bind(this.props)} updateFascismLevel={this.updateFascismLevel}/>
            </div>
          </React.Fragment>:
          <FrontendCatController startGame={this.startGame}/>

        }
      </div>
    );
  }
}

export default GameView;