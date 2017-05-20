import React from 'react';
import Recommendation from './Recommendation.jsx';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
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
