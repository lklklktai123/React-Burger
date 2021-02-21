import { checkPropTypes } from 'prop-types';
import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../NavigationItems/SideDrawer/DrawerToogle/DrawerToggle';
import classes from './Toobar.module.css';
const toolbar = probs => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={probs.toggleMenu} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
export default toolbar;
