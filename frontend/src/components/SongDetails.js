import React, {Component} from 'react';

class SongDetails extends Component {
    render() {
        let songId = this.props.match.params.songId
        console.log(songId)
        return (
            <div>
                <h2> {this.props.songs[songId].title} </h2>
               <p> {this.props.songs[songId].description} </p>

                <button onClick={() => {this.props.playSong(songId)}}>{this.state.isPlaying ? 'Pause' : 'Play'}</button>
            </div>
        )
    }
}

export default SongDetails;