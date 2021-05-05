const bcrypt = require('bcrypt');

class Router{
  constructor(app, db){
    this.register(app, db);
    this.login(app, db);
    this.logout(app, db);
    this.isloggedIn(app, db);
  }

  register(app, db){
    app.post('/signup/registered', (req, res) => {
      let username = req.body.username;
      let password = req.body.password;

      if(password.length < 8){
        res.json({
          success: false,
          msg: 'Password lenght is less then 8, try again'
        })
        return;
      }
      let encryptPass = bcrypt.hashSync(password,9);
      var values= [
        [username, encryptPass, 0, 0]
      ];
      var sqlInsert='Insert into user(username, password, win, lose) values ?'
      db.query(sqlInsert,[values], function (err, result) {
        if (err) {
          res.json({
            success: false,
            msg: 'User already exists, try again'
          })
        } else{
          res.json({
            success: true,
            msg: 'User has been registered'
          })
        }
      });
    });
  }

  login(app, db){
    app.post('/login/isLogin', (req, res) => {
      let username = req.body.username;
      let password = req.body.password;

      let cols = [username];
      db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) =>{
        if (err) {
          res.json({
            success: false,
            msg: 'An error occured, please try again'
          })
          return;
        }
        if(data && data.length === 1){
          bcrypt.compare(password, data[0].password, (bcryptErr, verified)=>{
            if(verified){
              //req.session.UserID = data[0].username;
              res.json({
                success: true,
                username: data[0].username,
                win : data[0].win,
                lose: data[0].lose
              })
              return;
            }else{
              res.json({
                success: false,
                msg: 'Invalid password, please check your password'
              })
            }
          })
        }else{
          res.json({
            success: false,
            msg: 'Login fail, please check your username or password'
          })
        }
      });
      });
  }

  logout(app, db){
    app.post('/login/logout', (req, res) => {
      if(req.body.username){
        // req.session.destroy();
        res.json({
          success: true
        })
      }else {
        res.json({
          success: false
        })
        return false;
      }
  });
  }

  isloggedIn(app, db){
    app.post('/login/isloggedIn', (req, res) => {
      if(req.session.UserID){
        let cols = [req.session.UserID];
        db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) =>{
            if(data && data.length === 1){
              res.json({
                success: true,
                username: data[0].username,
                win : data[0].win,
                lose: data[0].lose
              })
              return true;
            }else{
              res.json({
                success: false
              })
            }
      });
    }else{
      res.json({
        success: false
      })
    }
  });

}
}

module.exports = Router;
