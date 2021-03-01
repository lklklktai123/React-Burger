import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
import { checkPropTypes } from 'prop-types';
const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      activeClassName={classes.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);
export default navigationItem;
