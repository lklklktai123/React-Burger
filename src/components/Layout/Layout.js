import React, { useState } from 'react';
import Aux from '../../hoc/AuxHight';
import SideDraw from '../Navigation/NavigationItems/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/ToolBar/ToolBar';
import classes from './Layout.module.css';
import { connect } from 'react-redux';
const Layout = props => {
  const [showSideDraw, setshowSideDraw] = useState(false);
  const sidedeDrawerClosedHandler = () => {
    setshowSideDraw(false);
  };
  const toggleHandler = () => {
    setshowSideDraw(!showSideDraw);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuthenticated} toggleMenu={toggleHandler} />
      <SideDraw open={showSideDraw} closed={sidedeDrawerClosedHandler} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
