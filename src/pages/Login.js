import React from "react";
import classes from "./Login.module.css";
import { loginUrl } from "../spotify";

export default function Login() {
  return (
    <div className={classes.login}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="logo"
      />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}
