
import React, { Component } from "react";

const API_ADDREESS = 'https://spotify-api-wrapper.appspot.com';


class App extends Component{
	state = { artistQuery : ''};
	updateArtistQuery = event => {
		console.log('event.target.value',event.target.value);
		//console.log('event',event);
		this.setState({artistQuery: event.target.value});
	}
	
	searchArtist = () => {
		console.log('this.state', this.state);
		fetch(`${API_ADDREESS}/artist/${this.state.artistQuery}`)
		.then(response => response.json())
		.then(json => {
			console.log('json',json);
		})
	}
	handleKeyPress = event => {
		console.log('Enter clicker');
		if(event.key === 'Enter'){
			this.searchArtist();
		}
	}
	
	render() {
		return (
			<div>
				<h2>:: Music Master ::</h2>
				<input 
					onChange={this.updateArtistQuery}
					onKeyPress={this.handleKeyPress}
					placeholder="Search for an Artist"/>
				<button onClick={this.searchArtist}>Search</button>
				
			</div>
		);
	}	
}

export default App;
