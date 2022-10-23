import React from "react";
import MixItem from "./MixItem";
import classes from "./SectionRow.module.css";
import { useStateValue } from "../StateProvider";

export default function SectionRow(props) {
  const [
    { featured_playlists, featured_artists, recently_played_tracks },
    dispatch,
  ] = useStateValue();

  if (props.sectionTitle === "Featured artists") {
    var mixItem = featured_artists?.items
      .slice(0, 5)
      .map((item) => <MixItem item={item} artist="Artist" />);
  } else if (props.sectionTitle === "Featured playlists") {
    var mixItem = featured_playlists?.playlists.items
      .slice(0, 5)
      .map((item) => <MixItem item={item} />);
  } else if (props.sectionTitle === "Recently played") {
    var mixItem = recently_played_tracks?.items
      .slice(0, 5)
      .map((item) => (
        <MixItem
          context={item.context}
          item={item.track}
          type="Recently played"
        />
      ));
  }

  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader}>
        <h2>{props.sectionTitle}</h2>
        <span>SEE ALL</span>
      </div>
      <div className={classes.mixGrid}>{mixItem}</div>
    </div>
  );
}
