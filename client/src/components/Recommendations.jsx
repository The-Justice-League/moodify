import React from 'react';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
  }

  changeSong(uri, songName, artistName) {
    this.props.processRecommendation(uri, songName, artistName);
    console.log('clicked - value of uri === ', uri)
  }

  render() {
    console.log('Props in Recommendations === ', this.props)
    console.log('Show lyrics is currently set to === ', this.props.showLyrics)
    return (
      <div >
        <h2>Recommendations</h2>
        <h6 onClick={this.changeSong.bind(this, this.props.dummyd.uridummy, this.props.dummyd.songName, this.props.dummyd.artistName)} >
        {this.props.dummyd.songName + ' ' + this.props.dummyd.artistName}</h6>
      </div>
    );
  }
};

export default Recommendations;

/*
<h6>{this.props.songNameAndArtist[0] + ' - ' + this.props.songNameAndArtist[1]}</h6>
*/