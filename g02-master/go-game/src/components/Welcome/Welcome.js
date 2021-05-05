import React, {Component} from 'react';
import './Welcome.css';


class Welcome extends Component {

  /*constructor(){
    super();

    this.state = {
      login: false,
      findGameAsGuest: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleFGG = this.handleFGG.bind(this);
  }
handleLogin() {
    this.setState({login: true});
}
handleFGG() {
  this.setState({findGameAsGuest: true});
}*/

render() {
  /*if (this.state.login){
    return (<Redirect to={'/login'}/>)
  }
  if (this.state.findGameAsGuest){
    return (<Redirect to={'/findGameAsGuest'}/>)
  }*/

    return (
      <div className="row">
        <div className="medium-12 columns">
          <h2 id="welcomeText">Go Game</h2>
          <a href="/login" className="niceButton">Login/Register</a><br></br><br></br>
          <a href="/findGameAsGuest" className="niceButton">Find Game As Guest</a><br></br><br></br>
        </div>
      </div>
    );
  }
}
export default Welcome;
