import React, { Component } from 'react';
import Aux from '../../hoc/AuxHight';
import SideDraw from '../Navigation/NavigationItems/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/ToolBar/ToolBar';
import classes from './Layout.module.css';
class Layout extends Component {
  state = {
    showSideDraw: false,
  };
  sidedeDrawerClosedHandler = () => {
    this.setState({ showSideDraw: false });
  };
  toggleHandler = () => {
    this.setState(prevState => {
      return { showSideDraw: !prevState.showSideDraw };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar toggleMenu={this.toggleHandler} />
        <SideDraw
          open={this.state.showSideDraw}
          closed={this.sidedeDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
