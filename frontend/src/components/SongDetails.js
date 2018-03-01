import React, {Component} from 'react';

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

                <button onClick={() => {this.props.playSong(this.props.songs[songId])}}>{this.props.isPlaying ? 'Pause' : 'Play'}</button>
            </div>
        )
    }
}

export default SongDetails;