import React from 'react';
import axios from 'axios';
import {Polar, Doughnut, Bar} from 'react-chartjs-2';
import data from '../../../sampleWatsonData.js';
import Recommendations from './Recommendations.jsx';

class Moodifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      danceability: '',
      energy: '',
      mood: '',
      recommendations: [],
      dummyd: {
        songName: 'hello',
        artistName: 'Adele',
        uridummy: `spotify:track:49edox3q89CG1g6rJVfmHE`,
      }
    }

    this.danceability = this.danceability.bind(this);
    this.energy = this.energy.bind(this);
    this.mood = this.mood.bind(this);
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
      danceability: this.state.danceability,
      mood: this.state.mood,
      energy: this.state.energy,
      uri: this.props.spotifyURI,
      'num_results': 5
    }
    axios.get('/moodify', { params: queries }).then(res => {
      const data = res.data;
      this.setState({
        recommendations: data.recommendations
      })
      .catch(error => {
        throw error;
      });
    });
  }

  render() {
    // console.log('PROPS inside moodifier === ', this.props);
    return (
      <div className="maingraph">
      <h2>Music Analysis</h2>
      <Bar data={this.props.spotifyAnalysis} options={this.state.emotionOptions} width={500}/>
      <div className="inputFields">
        <label>
        Danceability
        <input value={this.state.danceability} type="text" onChange={this.danceability} />
        </label>
        <label>
        Mood
        <input value={this.state.mood} type="text" onChange={this.mood} />
        </label>
        <label>
        Energy
        <input value={this.state.energy} type="text" onChange={this.energy} />
        </label>
      </div>
      <button onClick={this.moodify} >Moodify</button>
      <Recommendations
        currentLyrics={this.props.currentLyrics}
        dummyd={this.state.dummyd}
        processRecommendation={this.props.processRecommendation}
        recommendations={this.state.recommendations}
        spotifyURI={this.props.spotifyURI}
        spotifyURI={this.props.spotifyURI}
        songNameAndArtist={this.props.songNameAndArtist}
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