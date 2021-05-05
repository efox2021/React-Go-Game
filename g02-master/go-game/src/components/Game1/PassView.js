import React, {Component} from 'react';


class PassView extends Component{
  render() {
      return (
          <input id="pass-btn" type="button" value="Pass"
            onClick={this.props.board.pass}/>
      );
  }
}
export default PassView;
