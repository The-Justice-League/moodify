const _ = require('underscore');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const rewire = require('rewire');
const spotify = rewire('../server/service/spotify');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe( 'spotify API', function() {

  describe( 'requestAccessToken', function() {

    it( 'should get a new authentication token from spotify', function () {
      const origToken = spotify.__get__('axios').defaults.headers.common['Authorization'];
      return spotify.requestAccessToken()
      .then( () => {
        const newToken = spotify.__get__('axios').defaults.headers.common['Authorization'];
        expect(newToken).to.not.equal(origToken);
      });
    });
  });

  describe( 'getSongByTitleAndArtist', function() {

    it( 'should return the correct spotify URI', function() {

      const testTitle = 'like a rolling stone';
      const testArtist = 'the rolling stones';

      return expect(spotify.getSongByTitleAndArtist(testTitle, testArtist)).to.eventually.equal('spotify:track:0oXnmfo2kW3joSeiXoazdV');
    });
  });

  describe( 'getTrackAnalysis', function() {

    let result;

    before( function() {
      const trackId = '0oXnmfo2kW3joSeiXoazdV';
      return spotify.getTrackAnalysis( trackId )
      .then( res => {
        result = res;
      })
      .catch( err => {
        console.log( err );
      });
    });

    it( 'should return results in the expected format', function() {
      expect(result).to.be.an('object');
      expect(result.danceability).to.not.be.undefined;
      expect(result.energy).to.not.be.undefined;
      expect(result.mood).to.not.be.undefined;
    });

    it( 'should return results in the expected range', function() {
      expect(result.danceability).to.be.within(0, 10);
      expect(result.energy).to.be.within(0, 10);
      expect(result.mood).to.be.within(0, 10);
    });
  });

  describe( 'getRecommendations', function() {

    let uri;
    let numResults;

    let result1;
    let result2;
    let result3;

    before( function() {
      uri = 'spotify:track:0oXnmfo2kW3joSeiXoazdV';
      numResults = 6;
    });

    it( 'should get recommendations with a seed and no moodifiers', function() {
      return spotify.getRecommendations( uri, {}, numResults )
      .then( res => {
        expect(res.data).to.have.property('tracks');
        expect(res.data.tracks).to.have.length.of.at.least(1);
        result1 = res.data.tracks;
      });
    });

    it( 'should get the requested number of recommnedations', function() {
      return spotify.getRecommendations( uri, {}, numResults )
      .then( res => {
        expect(res.data).to.have.property('tracks');
        expect(res.data.tracks).to.have.length.of(numResults);
      });
    });

    it( 'should get recommnedations with a seed and one moodifier', function() {
      const moodifiers = { energy: 2 };
      return spotify.getRecommendations( uri, moodifiers, numResults )
      .then( res => {
        expect(res.data).to.have.property('tracks');
        expect(res.data.tracks).to.have.length.of(numResults);
        result2 = res.data.tracks;
      });
    });

    it( 'should get recommnedations with a seed and all moodifiers', function() {
      const moodifiers = {
        energy: 2,
        danceability: 2,
        mood: 2,
      };
      return spotify.getRecommendations( uri, moodifiers, numResults )
      .then( res => {
        expect(res.data).to.have.property('tracks');
        expect(res.data.tracks).to.have.length.of(numResults);
        result3 = res.data.tracks;
      });
    });

    it( 'should provide different recommendations for different moodifiers', function() {
      result1 = _(result1).sortBy( 'uri' );
      result2 = _(result2).sortBy( 'uri' );
      result3 = _(result3).sortBy( 'uri' );
      expect(result1).to.not.deep.equal(result2);
      expect(result1).to.not.deep.equal(result3);
      expect(result2).to.not.deep.equal(result3);
    });
  });

});
