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
        label: props.songNameAndArtist[0] + ' - ' + props.songNameAndArtist[1],
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
      dummyd: {
        songName: 'hello',
        artistName: 'Adele',
        uridummy: `spotify:track:49edox3q89CG1g6rJVfmHE`
      }
    }

    this.danceability = this.danceability.bind(this);
    this.energy = this.energy.bind(this);
    this.mood = this.mood.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      moodifyData: {
        labels: ['Mood', 'Energy', 'Danceability'],
        label: props.songNameAndArtist[0] + ' - ' + props.songNameAndArtist[1],
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
    console.log('PROPS inside moodifier === ', this.props); // ADD OPTIONS TO BAR
    // mood, energy, dancability (in that order)
    return (
      <div className="maingraph">
      <h2>Music Analysis</h2>
      <Bar data={this.state.moodifyData} width={500}/>
      <div className="inputFields">
        <label>
          Mood
          <input value={this.state.mood} type="text" onChange={this.mood} />
        </label>

        <label>
          Energy
          <input value={this.state.energy} type="text" onChange={this.energy} />
        </label>

        <label>
           Danceability
          <input value={this.state.danceability} type="text" onChange={this.danceability} />
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


