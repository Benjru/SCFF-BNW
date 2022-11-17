import React, { Component } from 'react';
import './App.css';
import {GameBoard, TurnDisplay} from './components/GameComponents';
import FrontendCatController from './controllers/FrontendCatController';

// get state from fe gamestate controller?

class GameView extends Component {


  startGame = () => {
    this.props.startGame();
  }

  render() {
    return (
      <div className="App">
        {
          this.props.state.gameStarted ?
          <React.Fragment>
              <p className='turnText'>P{this.props.state.currTurn.playerId + 1}'s turn</p>
            <div className='gameViewContainer'>
              <GameBoard state={this.props.state}/>
              {/* <TurnDisplay cats={this.props.state.cats} useAction={this.useAction}/> */}
            </div>
          </React.Fragment>:
          <FrontendCatController startGame={this.startGame}/>

        }
      </div>
    );
  }
}

export default GameView;