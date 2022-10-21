import React from 'react';
import classes from './SidebarNav.module.css';
import { Link } from "react-router-dom";

// props --> icon, title
export default function SidebarNav(props) {
  return (
    <Link to={props.link ? props.link : ''}>
      <div className={classes.sidebarNav}>
        {props.img ? <div><props.icon style={{ fontSize: "13px" }} /></div> : props.icon && <props.icon className={classes.sidebarNav__icon} />}
        {props.icon ? <h4>{props.title}</h4>: <p>{props.title}</p>}  
      </div>
    </Link>
  )
}
