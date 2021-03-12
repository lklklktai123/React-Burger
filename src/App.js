import './App.css';
import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuider from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import AsyncComponent from './hoc/asyncComponent/asyncComponent';
const asyncCheckout = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = AsyncComponent(() => {
  return import('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        {/* <Route path="/logout" component={Logout} /> */}
        <Route path="/" component={BurgerBuider} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuider} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={asyncCheckout} />
          {/* <Route path="/" component={Checkout} /> */}
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
