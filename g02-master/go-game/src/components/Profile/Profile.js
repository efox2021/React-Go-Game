
//Alec Meyer Profile
import React, {Component} from 'react';
import './Profile.css';
import Login from '../Login/Login.js'
import { Redirect } from 'react-router-dom'
import ReactDOM from "react-dom";
import UserStore from '../../stores/UserStore';
import $ from 'jquery';
class Profile extends Component {
	constructor(props) {
        super(props);
		this.profilePictureRef = React.createRef();

		this.state = {
				Stats: [
				  {
						"Win": 0,
						"Lose": 0
					},
				],
				logout: false,

				//picture upload
				picture: false,
				src: false
			};
			this.doLogout = this.doLogout.bind(this);
		}

		//picture upload
		handlePictureSelected(event) {
		    var picture = event.target.files[0];
		    var src     = URL.createObjectURL(picture);

		    this.setState({
		      picture: picture,
		      src: src
		    });
		  }
			renderPreview() {
		    if(this.state.src) {
		      return (
		        <img src={this.state.src} height = "200" width = "200"/>

		      );
		    } else {
		      return (
		        <p>
		          No Preview
		        </p>
		      );
		    }
		  }

			upload() {
		    var formData = new FormData();

		    formData.append("file", this.state.picture);

		    $.ajax({
		      url: "/some/api/endpoint",
		      method: "POST",
		      data: formData,
		      cache: false,
		      contentType: false,
		      processData: false,
		      success: function(response) {
		        // Code to handle a succesful upload
		      }
		    });
		  }



	 renderTableData() {
         return (

            <tr>
               <td>{UserStore.win}</td>
               <td>{UserStore.lose}</td>
            </tr>
         )
   }

   renderTableHeader() {
      let header = Object.keys(this.state.Stats[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

	 doLogout(){
	 	this.setState({logout: true});
	 }

render() {

	if (this.state.logout){
		return (<Redirect to={'/login'}/>)
	}

return (
	<div className="row">
		<div className="medium-12 columns">
			<h2 id="welcomeText">Profile: {UserStore.username}</h2>

			<div>
        <input
          type="file"
          onChange={this.handlePictureSelected.bind(this)}
        />
        <br/>
        <div>
        {this.renderPreview()}
        </div>
        <hr/>
        <button
          onClick={this.upload.bind(this)}
        >
          Upload
        </button>
      </div>



			<table id='Stats'>
			   <tbody>
			   <tr>{this.renderTableHeader()}</tr>
				  {this.renderTableData()}
			   </tbody>
			</table>
			<input type="submit" className="button" value="logout" onClick={this.doLogout}/>
		</div>
	</div>
);
}


}
export default Profile;
