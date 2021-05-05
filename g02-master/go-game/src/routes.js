import React from 'react';
import {BrowserRouter,  Route, Switch} from 'react-router-dom';

import Welcome from '././components/Welcome/Welcome';
import Home from '././components/Home/Home';
import Login from '././components/Login/Login';
import Signup from '././components/Signup/Signup';
import FindGameAsGuest from '././components/FindGame/FindGameAsGuest/FindGameAsGuest';
import Profile from '././components/Profile/Profile';
import Game from '././components/Game1/Game';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/findGameAsGuest" component={FindGameAsGuest}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/game" component={Game}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;
