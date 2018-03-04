import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};


class SongsList extends Component {
  render() {
    //mapping songs array
    let songsJSX = this.props.songs.map(song  => {
        
      return <div className="listContainer">

        <Link to={`/${song.id}`} className="links">
          <h3> {song.title} </h3>
        </Link>

        <RaisedButton
            icon={this.props.isPlaying ? 
            <i className="material-icons">play_circle_filled</i> : 
            <i className="material-icons">pause_circle_filled</i> }
            style={style} onClick={() => {this.props.playSong(song)}}
        />

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