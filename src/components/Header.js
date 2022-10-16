import React from "react";
import classes from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useStateValue } from '../StateProvider';


export default function Header() {
  const [{ user }, dispatch] = useStateValue();
   
  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        <SearchIcon />
        <input 
          placeholder="Search for Artists, Songs, or Albums" 
          type="text" 
        />
      </div>
      <div className={classes.header__profile}>
        <Avatar src={user?.images[0]?.url} alt="AA" />
        <h5>{user?.display_name}</h5>
      </div>
    </div>
  );
}
