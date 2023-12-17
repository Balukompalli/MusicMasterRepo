
import React, { Component } from "react";
import Artist from "./Artist";


const API_ADDREESS = 'https://spotify-api-wrapper.appspot.com';


class App extends Component{
	state = { artistQuery : '', artist: null, tracks: []};
	updateArtistQuery = event => {
		//console.log('event.target.value',event.target.value);
		//console.log('event',event);
		this.setState({artistQuery: event.target.value});
	}
	
	searchArtist = () => {
		//console.log('this.state', this.state);
		fetch(`${API_ADDREESS}/artist/${this.state.artistQuery}`)
		.then(response => response.json())
		.then(json => {
			//console.log('json',json);
			if(json.artists.total > 0){
				const artist =  json.artists.items[0];
				console.log('artist', artist);
				this.setState({artist});
				
				fetch(`${API_ADDREESS}/artist/${artist.id}/top-tracks`)
				.then(response => response.json())
				//.then(json => console.log('tracks json', json))
				.then(json => this.setState({tracks: json.tracks}))
				.catch(error => alert(error.message));
			}
		})
		.catch(error => alert(error.message));
	
	}
	handleKeyPress = event => {
		//console.log('Enter clicker');
		if(event.key === 'Enter'){
			this.searchArtist();
		}
	}
	
	render() {
		console.log('this.state',this.state);
		return (
			<div>
				<h2>:: Music Master ::</h2>
				<input 
					onChange={this.updateArtistQuery}
					onKeyPress={this.handleKeyPress}
					placeholder="Search for an Artist"/>
				<button onClick={this.searchArtist}>Search</button>
				<Artist artist={this.state.artist}/>
				
			</div>
		);
	}	
}

export default App;
