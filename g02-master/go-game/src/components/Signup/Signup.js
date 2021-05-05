import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Signup.css';

class Signup extends Component {

  constructor(){
    super();

    this.state = {
      fields: {},
      errors: {},
     redirectToReferrer: false
   }
     this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
      }

  validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

      if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
      }

      if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphabet characters only.";
        }
      }

        if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.\nAt least 8 characters, 1 special symbol from @#$%&,\n 1 capital letter, 1 small letter, 1 number";
        }
      }

        this.setState({
          errors: errors
        });
        return formIsValid;
      }

      resetForm(){
        let fields = {};
        fields["username"] = "";
        fields["password"] = "";
        this.setState({fields:fields});
      }

      async doRegister(){
        if(!this.state.fields["username"]){
          return;
        }
        if(!this.state.fields["password"]){
          return;
        }
        try{
          if (this.validateForm()) {
          let res = await fetch('/signup/registered', {
            method: 'post',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.state.fields["username"],
              password: this.state.fields["password"],
              win: 0,
              lose: 0
            })
          });
          //let result = JSON.parse(JSON.stringify(res));
          let result = await res.json();
          if(result && result.success){
            this.resetForm();
            alert("Successfully registered");
          }
          else if (result && result.success === false) {
            this.resetForm();
            alert(result.msg);
          }
        }
      }
        catch(e){
          this.resetForm();
        }
      }

  render() {

     return (
      <div className="row" id="main-registration-container">
        <div className="medium-5 columns left" id="register">
        <h4>Registration</h4>

        <label>Username </label>
        <input type="text" name="username" placeholder="username" value={this.state.fields.username} onChange={this.handleChange}/><br></br>
        <div style={{ fontSize: 12, color: "red" }} className="errorMsg">{this.state.errors.username}</div>
        <label>Password </label>
        <input type="password" name="password" placeholder="password" value={this.state.fields.password} onChange={this.handleChange}/><br></br>
        <div style={{ fontSize: 12, color: "red" }} className="errorMsg">{this.state.errors.password}</div>
        <input type="submit" className="button" value="Register" onClick= {() => this.doRegister()}/><br></br>

        <a style={{ fontSize: 12}} href="/" className="button">Home</a><br></br>
        </div>
      </div>
    );
  }
}

export default Signup;
