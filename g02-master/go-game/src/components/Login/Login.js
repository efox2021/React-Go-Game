import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UserStore from '../../stores/UserStore';
import './Login.css';
import '../../App.css';

class Login extends Component {

  constructor(){
    super();

    this.state = {
     username: '',
     password: '',
     redirect: false,
     register: false
    };

    this.handleLogin = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleRegister = this.register.bind(this);
  }


  login() {
    var resultUsernameCheck = this.alphaNumCheck(document.getElementById("username").value);
    var resultPasswordCheck = this.alphaNumCheck(document.getElementById("password").value);
    console.log(resultUsernameCheck);
    if(resultUsernameCheck && resultPasswordCheck){
      this.setState({redirect: true});
    }
  }

  resetForm(){
    this.setState({
      username: '',
      password: '',
      redirect: false,
      register: false
    })
  }

  async doLogin(){
    if(!document.getElementById("username").value){
      return;
    }
    if(!document.getElementById("password").value){
      return;
    }
    try{
      let res = await fetch('/login/isLogin', {
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value
        })
      });
      let result = await res.json();
      if(result && result.success){
        UserStore.isloggedIn = true;
        UserStore.username = result.username;
        UserStore.win = result.win;
        UserStore.lose = result.lose;
        this.setState({redirect: true});
      }
      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    }
    catch(e){
      console.log();
      this.resetForm();
    }
  }

  register() {
    this.setState({register: true});
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  alphaNumCheck(entry) {
      let regex = /^[a-z0-9]+$/i;
      if (entry != null && entry.match(regex)) {
          return true;
      } else {
          return false;
      }
  }

  render() {
    if (this.state.redirect){
      return (<Redirect to={'/profile'}/>)
    }
    if(this.state.register){
      return (<Redirect to={'/signup'}/>)
    }

     return (
       <div className="row" id="Body">
           <div className="medium-5 columns left">
           <h4>Login</h4>
             <label>Username</label><br></br>
             <input type="text" id="username" name="username" placeholder="Username" onChange={this.handleChange}/><br></br><br></br>
             <label>Password</label><br></br>
             <input type="password" id="password" name="password"  placeholder="Password" onChange={this.handleChange}/><br></br><br></br>
             <input type="submit" className="button" value="Submit" onClick={() => this.doLogin()}/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" value="Register" onClick={this.handleRegister}/>

           </div>
         </div>

    );
  }
}

export default Login;
