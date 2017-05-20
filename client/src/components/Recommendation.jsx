import React from 'react';

class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.changeSong = this.changeSong.bind(this);
  }

  changeSong(event) {
    console.log( '1' );
    this.props.processRecommendation( this.props.uri, this.props.songName, this.props.artistName);
    console.log( '2' );
  }

  render() {
    return (
      <div onClick={this.changeSong} >
        <strong>{this.props.artistName + ' - ' + this.props.songName}</strong>
      </div>
    );
  }
}

export default Recommendation;
