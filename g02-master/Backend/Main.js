const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//Database
var db = mysql.createConnection({
  host:'coms-319-t02.cs.iastate.edu',
  user:'team1',
  password:'team1comsVM@319',
  database:'MyProject'
});

db.connect(function(err) {
  if (err){
    console.log('DB error');
    throw err;
    return false;
  }
});

const sessionStore = new MySQLStore({
  expiration: (1825 * 86400 * 1000),
  endConnectionOnClose: false
}, db);

app.use(session({
  key:'3v24h2v3j2kjbjb23423574',
  secret: 'bfcT32C4t3sdfT234Cregce',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1825 * 86400 * 1000),
    httpOnly: false
  }
}));

new Router(app, db);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5003);
