import React from 'react';
import { Component } from 'react';
import BoardIntersection from './BoardIntersection';


class BoardView extends Component{
  constructor(props){
    super(props);

    const board = this.props.board;

    this.state = {
      intersections: []
    }
  }

  renderIntersections(){
    var intersections = [];
    const board = this.props.board;

    for(var i= 0; i< board.size; i++){
      for(var j=0; j < board.size; j++){
        intersections.push(<BoardIntersection
          board={board}
          color={board.board[i][j]}
          row={i}
          col={j}
          onPlay={this.props.onPlay} />
        );
      }
    }

    return intersections.map(intersection => {
      var style ={
        top: intersection.props.row * 38,
        left: intersection.props.col * 38,
      };

      const onClick = () => {
        if(intersection.props.board.play(intersection.props.row, intersection.props.col))
            intersection.props.onPlay();
      }

      var classes= "intersection";

      if(intersection.props.color !== 0 )
        classes+= (intersection.props.color === 1 ? " black" : " white");

      return (<div className={classes} style={style} onClick={onClick}
            >{intersection.board}</div>) });
  }


  render(){
    var style = {
          width: this.props.board.size * 19,
          height: this.props.board.size * 19
      };

    return (<div id="board" >
              {this.renderIntersections()}

            </div>
    );
  }
}

export default BoardView;
