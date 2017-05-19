import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../dist/react-tabs.css';

import Moodifier from './Moodifier.jsx';
import LyricsAnalysis from './LyricsAnalysis.jsx';

class AnalysisTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Props in AnalysisTabs === ', this.props)
    return (
      <Tabs>
        <TabList>
          <Tab>Music Analysis</Tab>
          <Tab>Lyrics Analysis</Tab>
        </TabList>
        <TabPanel>
          <Moodifier
            currentLyrics={this.props.currentLyrics}
            processRecommendation={this.props.processRecommendation}
            spotifyURI={this.props.spotifyURI}
            songNameAndArtist={this.props.songNameAndArtist}
            spotifyAnalysis={this.props.spotifyAnalysis}
            spotifyURI={this.props.spotifyURI}
            songNameAndArtist={this.props.currentSongNameAndArtist}
            watson={this.props.watson}
          />
        </TabPanel>
        <TabPanel>
          <LyricsAnalysis
            songNameAndArtist={this.props.songNameAndArtist}
            watson={this.props.watson}
          />
        </TabPanel>
      </Tabs>
    );
  }

};

export default AnalysisTabs;