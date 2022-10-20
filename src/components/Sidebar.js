import React from "react";
import classes from "./Sidebar.module.css";
import SidebarNav from "./SidebarNav";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FavoriteIcon from "@material-ui/icons/Favorite";

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

      <div className={classes.sidebar__SecondLinks}>
        <SidebarNav icon={AddBoxIcon} title="Create Playlist" />
        <SidebarNav img='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' icon={FavoriteIcon} title="Liked Songs" />
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
