import './App.css';
import React, { useEffect } from "react";
import Login from './pages/Login';
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./pages/Player";
import Home from './pages/Home';

import { useStateValue } from './StateProvider';
import { Routes, Route } from 'react-router-dom';
import { getTokenFromUrl } from './spotify';

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      }); 

      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      });

      spotify.getPlaylist('37i9dQZEVXcQ9COmYvdajy').then(response => 
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response
        })
      )

      spotify.getFeaturedPlaylists().then(response => 
        dispatch({
          type: 'SET_MY_TOP_TRACKS',
          featured_playlists: response
        })
      )

      spotify.getMyTopArtists().then(response => 
        dispatch({
          type: 'SET_FEATURED_ARTISTS',
          featured_artists: response
        })
      )

      spotify.getMyRecentlyPlayedTracks().then(data =>
        dispatch({
          type: "SET_RECENTLY_PLAYED_TRACKS",
          recently_played_tracks: data
        })
      );
    }

  }, []);

  return (
    <div className="app">
      {
        token ? (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Player spotify={spotify} />
                </>
              }>
            </Route>
            <Route
              path="/home"
              element={
                <>
                  <Home spotify={spotify} />
                </>
              }>
            </Route>
          </Routes>
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
