import React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';
import logo from './logo.svg';
import UserStore from './stores/UserStore';
import './App.css';
import Routes from './routes'
import Signup from './components/Signup/Signup'

class App extends Component {

  constructor(){
    super();
    this.state={
      appName: "GO Game",
      home:false
    }
  }

  async componentDidMount(){
    try{
      let res = await fetch('/login/isloggedIn', {
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let result = await res.json();
      if(result && result.success){
        UserStore.loading = false;
        UserStore.isloggedIn =  true;
        UserStore.username = result.username;
      }
      else{
        UserStore.loading = false;
        UserStore.isloggedIn = false;
      }
    }
    catch(e){
      UserStore.loading = false;
      UserStore.isloggedIn = false;
    }
  }

    // async doLogout(){
    //   try{
    //     let res = await fetch('/login/logout', {
    //       method: 'post',
    //       headers:{
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       }
    //     });
    //     let result = await res.json();
    //     if(result && result.success){
    //       UserStore.isloggedIn = false;
    //       UserStore.username = '';
    //     }
    //   }
    //   catch(e){
    //     console.log(e);
    //   }
    // }

  render() {
    return (
      <div className="header">React-Go Game: g02
            <Routes name={this.state.appName}/>
      </div>

    );
  }
}
export default observer(App);
