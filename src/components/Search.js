import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import classes from './Search.module.css';

export default function Search() {
  return (
    
    <div className={classes.header__search}>
        <SearchIcon />
        <input 
          placeholder="Search for Artists, Songs, or Albums" 
          type="text" 
        />
    </div>
  )
}
