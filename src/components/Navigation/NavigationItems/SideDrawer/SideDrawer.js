import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems';
import classes from './SideDraw.module.css';
import BackDrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/AuxHight';
const sideDraw = probs => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (probs.open) attachedClasses = [classes.SideDrawer, classes.Open];
  return (
    <Aux>
      <BackDrop show={probs.open} clicked={probs.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems />
      </div>
    </Aux>
  );
};
export default sideDraw;
