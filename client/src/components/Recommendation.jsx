import React from 'react';

class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.changeSong = this.changeSong.bind(this);
  }

  changeSong(event) {
    this.props.processRecommendation( this.props.uri, this.props.songName, this.props.artistName);
  }

  render() {
    return (
      <div className="searchtext" onClick={this.changeSong} >
        <strong>{this.props.artistName + ' - ' + this.props.songName}</strong>
      </div>
    );
  }
}

export default Recommendation;

/*
<div className="resultsBox">
          {this.props.results.track_list.map((trackObj, i) => (
            <div
              className='searchText'
              key={i}
              value={i}
              onClick={this.handleClick} > {i + 1}. {trackObj.track.track_name} - {trackObj.track.artist_name}
            </div>
          ))}
        </div>
*/