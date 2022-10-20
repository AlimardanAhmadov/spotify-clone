import React, { useEffect, useState } from "react";
import "./Footer.css";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import SpotifyWebApi from "spotify-web-api-js";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { useStateValue } from "../StateProvider";

import { Grid, Slider } from "@material-ui/core";

const spotify = new SpotifyWebApi();

export default function Footer() {
  const [{ token, item, playing }, dispatch] = useStateValue();
  const [currentSongName, setCurrentSongName] = useState(" ");
  const [currentSongArtist, setCurrentSongArtist] = useState([]);
  const [currentSongCover, setCurrentSongCover] = useState(" ");

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });

      setCurrentSongName(r.item.name);
      setCurrentSongArtist(r.item.artists.map((artist) => artist.name).join(", "));
      setCurrentSongCover(r.item.album.images[0].url);
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const playNextSong = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((s) => {
      dispatch({
        type: "SET_ITEM",
        item: s.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const playPreviousSong = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((s) => {
      dispatch({
        type: "SET_ITEM",
        item: s.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumCover"
          src={currentSongCover}
          alt="playing song"
        />
        <div className="playingSongInfo">
          <h4>{ currentSongName }</h4>
          <small>{ currentSongArtist }</small>
        </div>
        <FavoriteBorderIcon />
      </div>
      <div className="footer__middle">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon className="footer__icon" onClick={playPreviousSong} />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__PlayIcon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__PlayIcon"
          />
        )}
        <SkipNextIcon className="footer__icon" onClick={playNextSong} />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
