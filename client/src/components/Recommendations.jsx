import React from 'react';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
  }

  changeSong(uri) {
    this.props.updatePlayer(uri);
    console.log('clicked - value of uri === ', uri)
  }

  render() {
    console.log('Props in Recommendations === ', this.props)
    return (
      <div >
        <h2>Recommendations</h2>
        <h6 onClick={this.changeSong.bind(this, this.props.dummyd.uridummy)} >
        {this.props.dummyd.songName + ' ' + this.props.dummyd.artistName}</h6>
      </div>
    );
  }
};

export default Recommendations;

/*
<h6>{this.props.songNameAndArtist[0] + ' - ' + this.props.songNameAndArtist[1]}</h6>
*/