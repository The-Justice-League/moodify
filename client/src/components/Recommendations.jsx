import React from 'react';
import Recommendation from './Recommendation.jsx';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="recommendation">
        <h2>Recommendations</h2>
        { this.props.recommendations.map( (recommendation, idx) =>
          <Recommendation
            processRecommendation={this.props.processRecommendation}
            uri={recommendation.uri}
            artistName={recommendation.artistName}
            songName={recommendation.songName}
            key={idx}
          />
        )}
      </div>
    );
  }
};

export default Recommendations;

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