import BoardView from './BoardView.js';
import AlertView from './AlertView';
import PassView from './PassView';
import React, {Component} from 'react';


class ContainerView extends Component{
  constructor(props){
    super(props);

    this.state = {
      board: props.board,
    };
    this.onBoardUpdate = this.onBoardUpdate.bind(this);
  }

  onBoardUpdate(){
    this.setState({board: this.props.board})
  }

  render(){
    const { board } = this.state;
    console.log(board);
    return (
      <div>
        <PassView board={board} />
        <BoardView board={board}
          onPlay={this.onBoardUpdate} />
      </div>
    )
  }

}
export default ContainerView;
