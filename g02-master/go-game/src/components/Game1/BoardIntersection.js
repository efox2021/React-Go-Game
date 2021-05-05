import React, {Component} from 'react';


 class BoardIntersection extends Component{
  constructor(props){
    super(props);
    this.state = {
      board:props.board
    }

    this.handleClick=this.handleClick.bind(this);
    // this.onChange=this.onChange.bind(this);
  }

  handleClick(){
    if(this.props.board.play(this.props.row, this.props.col))
        this.props.onPlay();
  }

  render(){
    const { row, col, current_color } = this.props;
    var style ={
      top: this.props.row * 19,
      left: this.props.col * 19,
      backgroundColor: "black"
    };

    var classes= "intersection";
    console.log(this.props)
    if(this.props.current_color !== 0)
      classes+= (this.props.current_color === 1 ? "-black" : "-white");

    return (
        <div onClick={this.handleClick}
          className={classes} style={style}></div>
    );
  }
}

export default BoardIntersection;
