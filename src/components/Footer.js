import React from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";

import { Grid, Slider } from "@material-ui/core";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumCover"
          src="https://i.scdn.co/image/ab67616d00004851d5541e782122573cd38bcd76"
          alt="playing song"
        />
        <div className="playingSongInfo">
          <h4>Let Go</h4>
          <small>Aaron May</small>
        </div>
      </div>
      <div className="footer__middle">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon className="footer__icon" />
        <PlayCircleOutlineIcon
          fontSize="large"
          className="footer__PlayIcon"
        />
        <SkipNextIcon className="footer__icon" />
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
