import React from 'react';
import classes from './Backdrop.module.css';
const backDrop = probs =>
  probs.show ? (
    <div className={classes.Backdrop} onClick={probs.clicked}></div>
  ) : null;
export default backDrop;
