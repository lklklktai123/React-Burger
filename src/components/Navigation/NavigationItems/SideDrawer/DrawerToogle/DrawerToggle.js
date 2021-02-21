import React from 'react';
import classes from './DrawerToggle.module.css';
const drawerToggle = probs => (
  <div className={classes.DrawerToggle} onClick={probs.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
export default drawerToggle;
