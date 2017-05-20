import React from 'react';
import axios from 'axios';
import {Polar, Doughnut, Bar} from 'react-chartjs-2';
import data from '../../../sampleWatsonData.js';
import Recommendations from './Recommendations.jsx';

class Moodifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mood: '',
      energy: '',
      danceability: '',
      moodifyData: {
        labels: ['Mood', 'Energy', 'Danceability'],
        datasets: [{
          label: 'Song Info',
          data: [
            props.spotifyAnalysis.mood,
            props.spotifyAnalysis.energy,
            props.spotifyAnalysis.danceability
          ],
        backgroundColor: [
          'rgba(252, 61, 57, 1)',
          'rgba(254, 203, 46, 1)',
          'rgba(83, 215, 105, 1)'
          ],
          borderColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)'
          ],
          borderWidth: 5
        }]
      },
      emotionOptions: {
        title: {
          display: false,
          text: 'Kanye West - Famous',
          fontSize: 24
        }
      },
      recommendations: []
    }

    this.danceability = this.danceability.bind(this);
    this.energy = this.energy.bind(this);
    this.mood = this.mood.bind(this);
    this.moodify = this.moodify.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      moodifyData: {
        labels: ['Mood', 'Energy', 'Danceability'],
        datasets: [{
          label: 'Moodified ~',
          data: [
            props.spotifyAnalysis.mood,
            props.spotifyAnalysis.energy,
            props.spotifyAnalysis.danceability
          ],
        backgroundColor: [
          'rgba(252, 61, 57, 1)',
          'rgba(254, 203, 46, 1)',
          'rgba(83, 215, 105, 1)'
          ],
          borderColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)'
          ],
          borderWidth: 5
        }]
      },
      });
    }


  danceability(event) {
    this.setState({
      danceability: event.target.value
    });
  }

  energy(event) {
    this.setState({
      energy: event.target.value
    });
  }

  mood(event) {
    this.setState({
      mood: event.target.value
    });
  }

  moodify() {
    const queries = {
      mood: this.state.mood,
      energy: this.state.energy,
      danceability: this.state.danceability,
      uri: this.props.spotifyURI,
      'num_results': 5
    };
    if ( this.state.danceability ) {
      queries.danceability = this.state.danceability;
    }
    if ( this.state.mood ) {
      queries.mood = this.state.mood;
    }
    if ( this.state.energy ) {
      queries.energy = this.state.energy;
    }

    axios.get('/recommend', { params: queries })
    .then(res => {
      const data = res.data;
      this.setState({
        recommendations: data.recommendations
      });
    })
    .catch(error => {
      throw error;
    });
  }

  render() {
    return (
      <div className="maingraph">
        <h2>Music Analysis</h2>
        <Bar
          data={this.state.moodifyData}
          width={500}
        />

        <div className="inputFields">
          <label id="mood">
          inputFields
          <input
            className="mood"
            value={this.state.mood}
            type="text"
            onChange={this.mood}
            placeholder="mood"
          />
          </label>

          <label id="energy">
          inputFields
          <input
            className="energy"
            value={this.state.energy}
            type="text"
            onChange={this.energy}
            placeholder="energy"
          />
          </label>

          <label id="danceability">
             inputFields
            <input
              className="danceability"
              value={this.state.danceability}
              type="text"
              onChange={this.danceability}
              placeholder="danceability"
            />
          </label>
        <button className="moodify" onClick={this.moodify} >Moodify</button>
      </div>

      {this.state.recommendations.length > 0 ?
        <div>
          <h2>Recommendations</h2>
          <Recommendations
            processRecommendation={this.props.processRecommendation}
            recommendations={this.state.recommendations}
          />
          </div>
      : null}

      </div>
    );
  }
}

export default Moodifier;
