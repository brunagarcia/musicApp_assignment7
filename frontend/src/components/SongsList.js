import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class SongsList extends Component {
    render() {
        //mapping songs array
        let songsJSX = this.props.songs.map(song  => {
            
            return <div>
                    <Link to={`/${song.id}`}>
                     <h3> {song.title} </h3>
                    </Link>
                   
                     <button type="button" onClick={() => {this.props.playSong(song)}}> {this.state.isPlaying ? 'Pause' : 'Play'}</button>   

                    </div>
        })

        return (
            <div>
                {songsJSX}
            </div>
        )
    }
}

export default SongsList;