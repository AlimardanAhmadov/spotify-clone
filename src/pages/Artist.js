import React from 'react';
import classes from './Artist.module.css';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Body from '../components/Body';

export default function Artist() {
  return (
    <div className={classes.main}>
      <div className={classes.main__body}>
        <Sidebar />
        <Body bodyType='artist' />
      </div>
      <Footer />
    </div>
  )
}
