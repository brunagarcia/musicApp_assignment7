import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import axios from 'axios';

import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  backgroundColor:'cyan400',
  margin: 12,
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      //State for pausing and playing a song.
      isPlaying: false,
      //State keeping track of your track.
      currentSong: 0
    };
  }

  componentDidMount(){
    axios.get('http://localhost:8080/getsongs')
    .then((response)=> {
      console.log(response);
      console.log(response.data);
        this.setState({
        songs: response.data
        })  
      })
    .catch((error) => {
      console.log(error)
      })
    }


  playSong = (song) => {
    this.setState({
      isPlaying: !this.state.isPlaying,
      currentSong: song.id
    })
  }


  play = () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  changeSong = (index) => {
    //checking what song is playing
    console.log(index)
    this.setState({
      currentSong: this.state.currentSong + index,
      isPlaying: this.state.isPlaying
    })
  }

  componentDidUpdate() {
    // this.audioPlayer.load()
    if(this.state.isPlaying) this.audioPlayer.play()
    else this.audioPlayer.pause()
  }

  render() {
    return (
      this.state.songs.length > 0 && 
      <div className="App">
    
        <h3> Playing: {this.state.songs[this.state.currentSong].title} </h3>

        <audio ref={(self) => {this.audioPlayer = self}}>
          <source src={this.state.songs[this.state.currentSong].source} />
        </audio>

        <RaisedButton
          icon={<i className="material-icons">skip_previous</i>}
          style={style} onClick={()=>{
            this.changeSong(-1)}} disabled={this.state.currentSong === 0}
        />

        <RaisedButton
          icon={<i className="material-icons">skip_next</i>}
          style={style} onClick={()=>{
            this.changeSong(1)}} disabled={this.state.currentSong === this.state.songs.length -1}
        />


        <RaisedButton
          icon={this.state.isPlaying ? 
          <i className="material-icons">play_circle_filled</i> : 
          <i className="material-icons">pause_circle_filled</i>
         } style={style} onClick={this.play}
        />
        
        
        <Switch>
          <Route exact path="/" render={()=>
            <SongsList 
            songs={this.state.songs} 
            playSong={this.playSong}
            isPlaying={this.state.isPlaying}
            />}
          />
          <Route path='/:songId' render={(props)=>
            <SongDetails 
            songs={this.state.songs} {...props}
            playSong={this.playSong}
            isPlaying={this.state.isPlaying}
            
            />}
          /> 

        </Switch>
       </div> 
        
      )
    }
}

export default App;
