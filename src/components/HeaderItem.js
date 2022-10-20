import React from 'react';
import classes from './HeaderItem.module.css';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

export default function HeaderItem(props) {
  return (
    <div className={classes.grid__item}>
        <div className={classes.gridImgDiv}>
            <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.grid__itemInfo}>
            <h3>{props.title}</h3>
            <PlayCircleFilledIcon style={{ fontSize: '60px', color: '#1ed15e', fill: 'rgb(30, 209, 94)'}} className={classes.body__shuffle} />
        </div>
    </div>
  )
}
