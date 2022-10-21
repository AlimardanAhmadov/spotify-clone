import React, { useEffect, useRef, useState } from "react";
import classes from "./Body.module.css";
import Header from "./Header";
import SongItem from "./SongItem";
import SpotifyWebApi from "spotify-web-api-js";

import { useStateValue } from "../StateProvider";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

const spotify = new SpotifyWebApi();

export default function Body() {
  const [{ discover_weekly, token }, dispatch] = useStateValue();
  const [currentList, setCurrentList] = useState([]);

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };
  var url = String(document.location.href);
  var slash = url.split("/");
  let id = slash[slash.length - 1];

  spotify.setAccessToken(token);
  spotify.getPlaylist(id).then((response) => setCurrentList(response));

  const primary_color = currentList.primary_color;

  const ref = useRef();
  const headerContainer = document.getElementById("headerContainer");

  const listenScrollEvent = (event) => {
    if (ref.current.scrollTop >= 100) { 
      document.getElementById("headerContainer").style.opacity = "1";
      ref.current.classList.add("blackBg"); 
    } else { 
      document.getElementById("headerContainer").style.opacity = "0";
      ref.current.classList.remove("blackBg"); 
    }
  };

  useEffect(() => {
    if (ref.current !== undefined) {
      ref.current.addEventListener("scroll", listenScrollEvent);
      //return () => ref.current.addEventListener('scroll', listenScrollEvent);
    }
  }, []);

  return (
    <div
      className={classes.body}
      ref={ref}
      style={{ backgroundColor: primary_color }}
    >
      <header>
        <div id="headerContainer" className={classes.headerContainer} style={{ backgroundColor: primary_color }}>
        </div>
        <Header />
      </header>
      <div className={classes.body__info}>
        <img src={currentList?.images?.[0].url} />
        <div className={classes.body__infoText}>
          <strong>{currentList?.type}</strong>
          <h2>{currentList?.name}</h2>
          <p>{currentList?.description}</p>
        </div>
      </div>

      <div className={classes.songs__section}>
        <div className={classes.songs__icons}>
          <PlayCircleFilledIcon
            onclick={playPlaylist}
            style={{ color: "#1ed15e", fill: "rgb(30, 209, 94)" }}
            className={classes.body__shuffle}
          />
          <svg
            className={classes.songIcon}
            role="img"
            height="32"
            width="32"
            viewBox="0 0 24 24"
            class="Svg-ytk21e-0 jAKAlG"
          >
            <path d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"></path>
          </svg>
          <svg
            className={classes.songIcon}
            role="img"
            height="32"
            width="32"
            viewBox="0 0 24 24"
            class="Svg-ytk21e-0 jAKAlG"
          >
            <path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
        </div>
        {currentList?.tracks?.items.map((item) => (
          <SongItem playSong={playSong} onclick={playSong} track={item?.track} />
        ))}
      </div>
    </div>
  );
}
