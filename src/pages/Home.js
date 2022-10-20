import React from "react";
import classes from "./Home.module.css";
import Sidebar from "../components/Sidebar";
import HomeBody from "../components/HomeBody";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={classes.home}>
      <div className={classes.home}>
        <div className={classes.home__body}>
          <Sidebar />
          <HomeBody />
        </div>
      </div>
      <Footer />
    </div>
  );
}
