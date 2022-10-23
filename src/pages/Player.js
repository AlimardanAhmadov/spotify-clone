import React from "react";
import classes from "./Player.module.css";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Footer from "../components/Footer";

export default function Player(props) {
  return (
    <div className={classes.main}>
      <div className={classes.main__body}>
        <Sidebar />
        <Body bodyType='playlist' />
      </div>
      <Footer />
    </div>
  );
}
