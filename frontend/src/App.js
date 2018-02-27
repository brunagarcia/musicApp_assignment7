import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';

class App extends Component {
  constructor() {
    super()

    this.state = {
      //State for pausing and playing a song.
      isPlaying: false,
      //State keeping track of your track.
      currentSong: 0
    }
  }

  play = () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  changeSong = (index) => {
    console.log(index)
    this.setState({
      currentSong: this.state.currentSong + index,
      isPlaying: this.state.isPlaying
    },() => {
      this.audioPlayer.load()
      this.audioPlayer.play()
    })
  }


  componentWillUpdate(prevProps, prevState) {
    if(prevState.isPlaying) this.audioPlayer.play()
    else this.audioPlayer.pause()
  }

  render() {
    //console log the song title playing.
    console.log(this.props.songs[this.state.currentSong].title);
    return (
      <div className="App">

        <h3> Playing: {this.props.songs[this.state.currentSong].title} </h3>

        <audio ref={(self) => {this.audioPlayer = self}}>
          <source src={this.props.songs[this.state.currentSong].source} />
        </audio>

        <button type="button" onClick={()=>{
          this.changeSong(-1)}} disabled={this.state.currentSong === 0}>
            Previous
        </button>

        <button type="button" onClick={()=>{
          this.changeSong(1)}} disabled={this.state.currentSong === this.props.songs.length -1}>
            Next  
        </button>

        <button onClick={this.play}>
          {this.state.isPlaying ? 'Pause' : 'Play'}
        </button> 

        <Route exact path="/" render={()=>
          <SongsList msg={'this is how we pass props in react router'}/>}
        />
        <Route path='/:songId'render={(props)=>
          <SongDetails songs={this.props.songs} {...props}/>}
        />


      </div>
    );
  }
}

export default App;
