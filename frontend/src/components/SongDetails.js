import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class SongDetails extends Component {
  render() {
    console.log("songs")
    console.log(this.props.songs)

    console.log("params")
    console.log(this.props.match.params);

    let songId = Number(this.props.match.params.songId);
    
    console.log("songid")
    console.log(songId)
    return (
      <div>
        <h2> {this.props.songs[songId].title} </h2>
        <p> {this.props.songs[songId].description} </p>

        <RaisedButton
          icon={this.props.isPlaying ? <i className="material-icons">play_circle_filled</i> : <i className="material-icons">pause_circle_filled</i> }
          style={style} onClick={() => {
            this.props.playSong(this.props.songs[songId])}
          }
        />

    </div>
    )
  }
}

export default SongDetails;