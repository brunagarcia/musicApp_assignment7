import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import axios from 'axios';

import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';


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
    //checking what song is playing
    // console.log(song.source)
    // console.log(song.id)

    // this.audioPlayer.load()
    // this.audioPlayer.play()
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

        <button type="button" onClick={()=>{
          this.changeSong(-1)}} disabled={this.state.currentSong === 0}>
            Previous
        </button>

        <button type="button" onClick={()=>{
          this.changeSong(1)}} disabled={this.state.currentSong === this.state.songs.length -1}>
            Next
        </button>

        <button onClick={this.play}>
          {this.state.isPlaying ? 'Pause' : 'Play'}
        </button> 
        
        
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
