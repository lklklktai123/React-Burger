import './App.css';
import React, { useEffect, Suspense } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuider from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const App = props => {
  const { onTryAutoSignUp } = props;
  useEffect(() => {
    // Update the document title using the browser API
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      {/* <Route path="/logout" component={Logout} /> */}
      <Route path="/" component={BurgerBuider} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuider} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        {/* <Route path="/" component={Checkout} /> */}
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

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
