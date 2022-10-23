import React, { useEffect, useRef, useState } from "react";
import classes from "./Body.module.css";
import Header from "./Header";
import SongItem from "./SongItem";
import SpotifyWebApi from "spotify-web-api-js";

import { useStateValue } from "../StateProvider";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

const spotify = new SpotifyWebApi();

export default function Body(props) {
  const [{ token }, dispatch] = useStateValue();
  const [currentList, setCurrentList] = useState([]);
  const [topTracksList, setTopTracksList] = useState([]);

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
  let pageType = slash[slash.length - 2];

  if (pageType === "playlist") {
    spotify.setAccessToken(token);
    spotify.getPlaylist(id).then((response) => setCurrentList(response));
  } else {
    spotify.setAccessToken(token);
    spotify.getArtist(id).then((response) => setCurrentList(response));
    spotify.getArtistAlbums(id).then((data) => setTopTracksList(data));
  }

  var primary_color = currentList.primary_color;

  const ref = useRef();

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

    if (pageType === "playlist") {
      
    }
  }, []);

  return (
    <div
      className={classes.body}
      ref={ref}
      style={{ backgroundColor: primary_color }}
    >
      <header>
        <div
          id="headerContainer"
          className={classes.headerContainer}
          style={{ backgroundColor: primary_color }}
        ></div>
        <Header />
      </header>
      <div className={classes.body__info}>
        {props.bodyType === "playlist" ? (
          <>
            <img src={currentList?.images?.[0].url} />
            <div className={classes.body__infoText}>
              <strong>{currentList?.type}</strong>
              <h2>{currentList?.name}</h2>
              <p>{currentList?.description}</p>
            </div>
          </>
        ) : (
          <>
            {currentList?.type === "artist" ? (
              <>
                <img
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    zIndex: "1",
                    width: "16vw",
                  }}
                  src={currentList?.images?.[0].url}
                />
                <div className={classes.body__infoText}>
                  <div className={classes.verified}>
                    <div className={classes.verifiedBg}></div>
                    <svg
                      role="img"
                      height="24"
                      width="24"
                      class="Svg-ytk21e-0 hFEdcY b0NcxAbHvRbqgs2S8QDg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10.814.5a1.658 1.658 0 012.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 011.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 01-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 01-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 01-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 010-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 011.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"></path>
                    </svg>
                    <span>Verified artist</span>
                  </div>
                  <h2>{currentList?.name}</h2>
                  <p className={classes.followersCount}>
                    {currentList?.followers?.total} monthly listeners
                  </p>
                </div>
              </>
            ) : (
              <p>Ok</p>
            )}
          </>
        )}
      </div>

      <div className={classes.songs__section}>
        <div className={classes.songs__icons}>
          <PlayCircleFilledIcon
            onclick={playPlaylist}
            style={{ color: "#1ed15e", fill: "rgb(30, 209, 94)" }}
            className={classes.body__shuffle}
          />
          <button>Follow</button>
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
        {pageType === "playlist"
          ? currentList?.tracks?.items.map((item) => (
              <SongItem
                playSong={playSong}
                onclick={playSong}
                track={item?.track}
              />
            ))
          : topTracksList?.items?.map((item) => (
              <SongItem
                playSong={playSong}
                onclick={playSong}
                track={item}
                topTrack="topTrack"
              />
            ))}
      </div>
    </div>
  );
}
