import React from 'react';
import classes from './Logo.module.css';
import logoBurger from '../images/burger-logo.png';
const logo = probs => (
  <div className={classes.Logo}>
    <img src={logoBurger} alt="MyBurger" />
  </div>
);
export default logo;
