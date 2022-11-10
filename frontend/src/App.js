import React, { Component } from 'react';
import './App.css';
import {SelectCat} from './controllers/FrontendCatController';
import {GameBoard, TurnDisplay} from './controllers/FrontendGameStateController';
import Players from './components/Players';

class App extends Component {
  state = {
    players: [],
    gameStarted: false
  };

  startGame = (players) => {
    // generate game board
    this.setState({
      players,
      gameStarted: true,
      currTurn: 1
    })
  }

  updateTurn = (turn) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currTurn: turn
      }
    });
  }

  updateHand = (playerIndex, hand) => {
    // 1. Make a shallow copy of the players arr
    let players = [...this.state.players];
    // 2. Make a shallow copy of the player
    let player = {...players[playerIndex]};
    // 3. Replace the player's hand property
    player.hand = hand;
    // 4. Put it back into our array.
    players[playerIndex] = player;
    // 5. Set the state to our new copy
    this.setState({players});
  }

  render() {
    return (
      <div className="App">
        {
          this.state.gameStarted ?
          <React.Fragment>
              <p className='turnText'>P{this.state.currTurn}'s turn</p>
            <div className='gameViewContainer'>
              <GameBoard players={this.state.players}/>
              <TurnDisplay players={this.state.players} updateTurn={this.updateTurn} updateHand={this.updateHand.bind(this)}/>
            </div>
          </React.Fragment>:
          <React.Fragment>
            <Players players={this.state.players}/>
            <SelectCat startGame={this.startGame}/> 
          </React.Fragment>

        }
      </div>
    );
  }
}

export default App;