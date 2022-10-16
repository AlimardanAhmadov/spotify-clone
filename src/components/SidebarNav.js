import React from 'react';
import classes from './SidebarNav.module.css';

// props --> icon, title
export default function SidebarNav(props) {
  return (
    <div className={classes.sidebarNav}>
        {props.icon && <props.icon className={classes.sidebarNav__icon} />}
        {props.icon ? <h4>{props.title}</h4>: <p>{props.title}</p>}  
    </div>
  )
}
