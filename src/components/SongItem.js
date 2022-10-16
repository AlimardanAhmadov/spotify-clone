import React from "react";
import classes from "./SongItem.module.css";

export default function SongItem(props) {
  return (
    <div className={classes.songItem}>
      <img className={classes.songItem__album} src={props.track.album.images[0].url} alt="" />
      <div className={classes.songItem__info}>
        <h1>{props.track.name}</h1>
        <p>
          {props.track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {props.track.name}
        </p>
      </div>
    </div>
  );
}
