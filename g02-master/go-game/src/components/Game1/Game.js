import React, {Component} from 'react';
import { board } from './Board.js';
import ContainerView from './ContainerView.js';



class Game extends Component{
  constructor(props){
    super(props);
    console.log(board);
    this.state = {
      board: board(19)
    };
    console.log(this.state);
  }
  render(){
    return(<ContainerView board={this.state.board}/>)
  }


}
export default Game;
