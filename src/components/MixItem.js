import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./MixItem.module.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import SpotifyWebApi from "spotify-web-api-js";

import { useStateValue } from "../StateProvider";

const spotify = new SpotifyWebApi();

export default function MixItem(props) {
  const [{ token, selected_mix }, dispatch] = useStateValue();
  const [mixCover, setMixCover] = useState(" ");
  const [mixName, setMixName] = useState(" ");

  var uri = props.context?.uri.substring(17);
  var artistId = props.item.artists?.[0];

  if (props.context?.type === "playlist") {
    spotify.setAccessToken(token);
    spotify
      .getPlaylist(uri)
      .then((response) => setMixCover(response.images[0].url));
  } else {
    if (artistId !== undefined) {
      spotify.setAccessToken(token);
      spotify.getArtist(artistId.id).then((response) => {
        setMixCover(response.images[0].url);
        setMixName(response.artists?.[0].name);
      });
    }
  }

  return (
    <Link to={props.item.type === 'playlist' ? `playlist/${props.item.id}` : `artist/${props.item.id}`}>
      <div className={classes.mixItem}>
        <div className={classes.itemTop}>
          {props.type ? (
            props.context?.type === "playlist" ? (
              <img src={mixCover} alt="playlist" />
            ) : (
              <img src={mixCover} style={{ borderRadius: "50%" }} />
            )
          ) : (
            props.artist ? <img style={{ borderRadius: "50%" }} src={props.item.images[0]?.url} alt={props.item.name} /> : <img src={props.item.images[0]?.url} alt={props.item.name} />
          )}
          <div className={classes.playButton}>
            <PlayCircleFilledIcon
              style={{
                fontSize: "60px",
                color: "#1ed15e",
                fill: "rgb(30, 209, 94)",
              }}
            />
          </div>
        </div>
        {props.type ? (
          props.context?.type === "playlist" ? (
            <h4 className={classes.mixTitle}>{props.item.name}</h4>
          ) : (
            <h4 className={classes.mixTitle}>{props.item.artists?.[0].name}</h4>
          )
        ) : (
          <h4 className={classes.mixTitle}>{props.item.name}</h4>
        )}

        {props.type ? (
          props.context?.type === "playlist" ? (
            <div className={classes.mixArtists}>
              {props?.item.artists.map((item, index) => (
                <a>
                  {item.name}
                  {index === props?.item.artists.length - 1 ? "" : ","}{" "}
                </a>
              ))}
            </div>
          ) : (
            <p className={classes.mixArtists}>Artist</p>
          )
        ) : (
          props.item ? <p className={classes.mixArtists}>{props.item.name}</p> : <p className={classes.mixArtists}>Artist</p>
        )}
      </div>
    </Link>
  );
}
