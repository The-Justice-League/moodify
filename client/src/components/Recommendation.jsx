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

