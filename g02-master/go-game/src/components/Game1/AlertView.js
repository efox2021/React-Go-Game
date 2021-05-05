import React, {Component} from 'react';


class AlertView extends Component{

  render() {
      const { board } = this.props;

      var text = "";
      if (board.in_atari)
          text = "ATARI!";
      else if (board.attempted_suicide)
          text = "SUICIDE!";

      return (
          <div id="alerts">{text}</div>
      );
  }
}
export default AlertView;
