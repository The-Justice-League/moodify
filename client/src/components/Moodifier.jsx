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
      recommendations: [],
      dummyd: [{
        songName: 'hello',
        artistName: 'Adele',
        uridummy: `spotify:track:0ENSn4fwAbCGeFGVUbXEU3`
      },
      {
        songName: 'Stronger',
        artistName: 'Kanye',
        uridummy: `spotify:track:6C7RJEIUDqKkJRZVWdkfkH`
      }
      ]
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
    console.log('PROPS inside moodifier === ', this.props); // ADD OPTIONS TO BAR
    // mood, energy, dancability (in that order)
    return (
      <div className="maingraph">
        <h2>Music Analysis</h2>
        <Bar
          data={this.state.moodifyData}
          width={500}
        />

        <div className="inputFields">
          <label>
          Mood
          <input
            className="mood"
            value={this.state.mood}
            type="text"
            onChange={this.mood}
            placeholder="mood"
          />
          </label>

          <label>
          Energy
          <input
            className="energy"
            value={this.state.energy}
            type="text"
            onChange={this.energy}
            placeholder="energy"
          />
          </label>

          <label>
             Danceability
            <input
              className="danceability"
              value={this.state.danceability}
              type="text"
              onChange={this.danceability}
              placeholder="danceability"
            />
          </label>
      </div>
      <button className="moodify" onClick={this.moodify} >Moodify</button>
      <Recommendations
        processRecommendation={this.props.processRecommendation}
        recommendations={this.state.recommendations}
      />
      </div>
    );
  }
}

export default Moodifier;

/*
return (
  <div className="maingraph">
  <h2>Music Analysis</h2>
  <Bar data={this.state.emotionData} options={this.state.emotionOptions} width={500}/>
  <div className="maingraph">
  <h5>Social</h5>
  <Polar data={this.state.socialData} options={this.state.socialData} width={500}/>
  </div>
  <div className="maingraph">
  <h5>Language</h5>
  <Doughnut data={this.state.languageData} options={this.state.languageOptions} width={500}/>
  </div>
  </div>
)
*/