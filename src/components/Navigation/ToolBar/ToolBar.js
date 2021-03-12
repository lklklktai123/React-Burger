import { checkPropTypes } from 'prop-types';
import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../NavigationItems/SideDrawer/DrawerToogle/DrawerToggle';
import classes from './Toobar.module.css';
const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.toggleMenu} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);
export default toolbar;
