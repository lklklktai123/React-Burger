import React from 'react';
import classes from './NavigationItem.module.css';
const navigationItem = probs => (
  <li className={classes.NavigationItem}>
    <a href={probs.link} className={probs.active ? classes.active : null}>
      {probs.children}
    </a>
  </li>
);
export default navigationItem;
