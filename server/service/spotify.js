const _ = require('underscore');
const Promise = require('bluebird');
const config = require('../config');

const axios = require('axios');
const querystring = require('querystring');
const authenticationParsers = require('www-authenticate').parsers;

const SPOTIFY_AUTHENTICATION_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_ROOT_URL = 'https://api.spotify.com/v1';
const SPOTIFY_SEARCH_URL = `${SPOTIFY_ROOT_URL}/search`;
const SPOTIFY_ANALYSIS_URL = `${SPOTIFY_ROOT_URL}/audio-features`;
const SPOTIFY_RECOMMENDATIONS_URL = `${SPOTIFY_ROOT_URL}/recommendations`;

const requestAccessToken = () => {
  const qs = querystring.stringify({ 'grant_type': 'client_credentials' });
  const axiosConfig = {
    auth: {
      username: config.SPOTIFY_API_KEY.id,
      password: config.SPOTIFY_API_KEY.secret,
    }
  };

  return axios.post( SPOTIFY_AUTHENTICATION_URL, qs, axiosConfig )
  .then( response => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
  })
  .catch( err => {
    console.log( 'failed token request' );
    console.log( err );
  });
};

const isExpiredTokenError = function( err ) {
  if ( err.response &&
       err.response.headers &&
       (authHeader = err.response.headers['www-authenticate']) &&
       (parsedHeader = new authenticationParsers.WWW_Authenticate(authHeader)) &&
       parsedHeader.parms &&
       (parsedHeader.parms.error_description === 'The access token expired') ) {
    return true;
  } else {
    return false;
  }
};

const authenticatedRequest = function( requestFunction, ...args ) {
  return requestFunction( ...args )
  .catch( err => {

    if ( isExpiredTokenError(err) ) {
      return requestAccessToken()
      .then( () => {
        return requestFunction( ...args );
      });

    } else {
      return Promise.reject(err);
    }
  });
};

// standardize Spotify's music analysis results to a range of [0, 10] for client
// and [0, 1] for Spotify.
// can take single value, or array or object of values
const standardizeResult = function( input, forClient = true ) {
  const standardizeValue = function( val ) {
    return forClient ? (val * 10) : (val / 10);
  };

  if ( _.isArray(input) ) {
    return _(input).map( val => standardizeValue(val) );
  } else if ( _.isObject(input) ) {
    return _(input).mapObject( val => standardizeValue(val) );
  } else {
    return standardizeValue(val);
  }
};

const mapMoodifyToSpotify = function( moodifiers ) {
  let spotifyAttributes = {};

  if ( moodifiers.hasOwnProperty('mood') ) {
    spotifyAttributes.valence = moodifiers.mood;
  }
  if ( moodifiers.hasOwnProperty('energy') ) {
    spotifyAttributes.energy = moodifiers.energy;
  }
  if ( moodifiers.hasOwnProperty('danceability') ) {
    spotifyAttributes.danceability = moodifiers.danceability;
  }

  return standardizeResult( spotifyAttributes, false );
};

const mapSpotifyToMoodify = function( spotifyAttributes ) {
  let moodifyAttributes = {};

  if ( spotifyAttributes.hasOwnProperty('valence') ) {
    moodifyAttributes.mood = spotifyAttributes.valence;
  }
  if ( spotifyAttributes.hasOwnProperty('energy') ) {
    moodifyAttributes.energy = spotifyAttributes.energy;
  }
  if ( spotifyAttributes.hasOwnProperty('danceability') ) {
    moodifyAttributes.danceability = spotifyAttributes.danceability;
  }

  return standardizeResult( moodifyAttributes, true );
};

const getSongByTitleAndArtistRequest = function( title, artist ) {
  const axiosConfig = {
    params: {
      q: `track:${title} artist:${artist}`,
      type: 'track',
    },
  };

  return axios.get( SPOTIFY_SEARCH_URL, axiosConfig )
  .then( response => {
    return response.data.tracks.items[0].uri;
  });
};

const getTrackAnalysisRequest = function( trackId ) {
  return axios.get( `${SPOTIFY_ANALYSIS_URL}/${trackId}` )
  .then( res => {
    return standardizeResult({
      danceability: res.data.danceability,
      energy: res.data.energy,
      mood: res.data.valence,
    });
  });
};

const getRecommendationsRequest = function( uri, moodifiers, numResults ) {
  const trackId = uri.slice( 'spotify:track:'.length );

  let spotifyAttributes = mapMoodifyToSpotify( moodifiers );

  let params = {
    'seed_tracks': trackId,
    limit: numResults,
  };
  for ( prop in spotifyAttributes ) {
    params['target_' + prop] = spotifyAttributes[prop];
  }

  return axios.get( `${SPOTIFY_RECOMMENDATIONS_URL}`, { params: params } );
};

const getSongByTitleAndArtist = function( title, artist ) {
  return authenticatedRequest( getSongByTitleAndArtistRequest, title, artist );
};

const getTrackAnalysis = function( trackId ) {
  return authenticatedRequest( getTrackAnalysisRequest, trackId );
};

const getRecommendations = function( uri, moodifiers = {}, numResults = 5 ) {
  return authenticatedRequest( getRecommendationsRequest, uri, moodifiers, numResults );
};

module.exports.requestAccessToken = requestAccessToken;
module.exports.getSongByTitleAndArtist = getSongByTitleAndArtist;
module.exports.getTrackAnalysis = getTrackAnalysis;
module.exports.getRecommendations = getRecommendations;
