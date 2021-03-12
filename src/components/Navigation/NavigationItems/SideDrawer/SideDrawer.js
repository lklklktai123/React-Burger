import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems';
import classes from './SideDraw.module.css';
import BackDrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/AuxHight';
import { checkPropTypes } from 'prop-types';
const sideDraw = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) attachedClasses = [classes.SideDrawer, classes.Open];
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems isAuthenticated={checkPropTypes.isAuth} />
      </div>
    </Aux>
  );
};
export default sideDraw;
