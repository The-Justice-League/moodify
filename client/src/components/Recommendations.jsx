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
    // console.log('Show lyrics is currently set to === ', this.props.showLyrics)
    return (
      <div >
        <h2>Recommendations</h2>
        <h6 onClick={this.changeSong.bind(this, this.props.dummyd[0].uridummy, this.props.dummyd[0].songName, this.props.dummyd[0].artistName)} >
        {this.props.dummyd[0].songName + ' ' + this.props.dummyd[0].artistName}</h6>

        <h6 onClick={this.changeSong.bind(this, this.props.dummyd[1].uridummy, this.props.dummyd[1].songName, this.props.dummyd[1].artistName)} >
        {this.props.dummyd[1].songName + ' ' + this.props.dummyd[1].artistName}</h6>
      </div>
    );
  }
};

export default Recommendations;

/*
<h6>{this.props.songNameAndArtist[0] + ' - ' + this.props.songNameAndArtist[1]}</h6>


*/