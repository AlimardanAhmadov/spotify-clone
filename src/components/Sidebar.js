import React from "react";
import classes from "./Sidebar.module.css";
import SidebarNav from "./SidebarNav";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateValue } from '../StateProvider';

export default function Sidebar() {
  const [{ playlists }, dispatch] = useStateValue();

  return (
    <div className={classes.sidebar}>
      <img
        className={classes.sidebar__logo}
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="logo"
      />
      <div className={classes.sidebar__links}>
        <SidebarNav link='/home' icon={HomeIcon} title="Home" />
        <SidebarNav link='/search' icon={SearchIcon} title="Search" />
        <SidebarNav link='/' icon={LibraryMusicIcon} title="Your Library" />
      </div>

      <strong className={classes.sidebar__title}>PLAYLISTS</strong>

      <hr/>

      <div className={classes.playlist__items}>
        {playlists?.items?.map(playlist => (
          <SidebarNav title={playlist.name} />
        ))}
      </div>
    </div>
  );
}
