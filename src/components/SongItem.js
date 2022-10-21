import React, { useEffect, useState } from "react";
import classes from "./SongItem.module.css";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "../StateProvider";
import PauseIcon from "@material-ui/icons/Pause";

const spotify = new SpotifyWebApi();


export default function SongItem(props) {
  const [{ token, item, playing }, dispatch] = useStateValue();
  const [currentSongName, setCurrentSongName] = useState(" ");

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
      
      setCurrentSongName(r.item?.name);
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

  return (
    <div className={classes.songItem} onClick={handlePlayPause}>
      {
        currentSongName === props.track?.name ? (
          <p><PauseIcon /></p>
        ) : (
          <p></p>
        )
      }
      <img className={classes.songItem__album} src={props.track?.album?.images[0].url} alt="" />
      <div className={classes.songItem__info}>
        <h1>{props.track?.name}</h1>
        <p>
          {props.track?.artists.map((artist) => artist.name).join(", ")} -{" "}
          {props.track?.name}
        </p>
      </div>
    </div>
  );
}
