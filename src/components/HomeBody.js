import React, { useRef, useEffect, useState } from "react";
import classes from './HomeBody.module.css';
import Header from './Header';
import HeaderItem from './HeaderItem';
import SectionRow from './SectionRow';


export default function HomeBody() {
  const homeRef = useRef();
  const header = document.getElementById('Header');

  const listenScrollEvent = event => {
    if (homeRef.current.scrollTop >= 100) {
      if (header) {
        document.getElementById('Header').classList.add('newHeader');
        homeRef.current.classList.add('blackBg');
      }
    } 
    else {
      if (header) {
        document.getElementById('Header').classList.remove('newHeader');
        homeRef.current.classList.remove('blackBg');
      }
    }
  };

  useEffect(() => {
    if (homeRef.current !== undefined) {
      homeRef.current.addEventListener('scroll', listenScrollEvent);
      //return () => homeRef.current.addEventListener('scroll', listenScrollEvent);
    }
  }, []);

  return (
    <div className={classes.home__body} ref={homeRef}>
      <header>
        <Header />
      </header>
      <div className={classes.home__artists}>
        <h2 className={classes.homeGreeter}>
          Good afternoon
        </h2>
        <div className={classes.artistsGrid}>
          <HeaderItem image='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' title='Liked Songs' />
          <HeaderItem image='https://i.scdn.co/image/ab6761610000e5ebb2d40fe9ce382e4b2719717a' title='OTP' />
          <HeaderItem image='https://i.scdn.co/image/ab67616d0000b2732ae92030b51fb8135d694af9' title='LONG.LIVE.A$AP (Deluxe Version)' />
          <HeaderItem image='https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/nT3j4pbjA1iQrXadgrAZOXkfMaaqwrVQo0ux0ghY34n88P76Wdmmc_QldlN07bftkvYN28Lj0-eQOyi8tFVQcOMigb7l3QLyXWDvLLdSy7k=/MDQ6NjQ6OTBUNjItMDEtMg==' title='Discover Weekly' />
          <HeaderItem image='https://seed-mix-image.spotifycdn.com/v6/img/grime/6Ip8FS7vWT1uKkJSweANQK/en/default' title='Grime Mix' />
          <HeaderItem image='https://i.scdn.co/image/ab6761610000e5eb9d28e5b36e32b169ca474554' title='Aaron May' />
        </div>
      </div>
      <div className={classes.home__mixes}>
        <SectionRow sectionTitle="Featured playlists" />
        <SectionRow sectionTitle="Featured artists" />
        <SectionRow sectionTitle="Recently played" />
      </div>

      <div className={classes.footerDiv}>
        <div></div>
      </div>
    </div>
  )
}
