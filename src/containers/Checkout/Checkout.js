import React from 'react';
import CheckOutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
const Checkout = props => {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0,
  // };
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   console.log(query.entries());
  //   const ingredients = {};
  //   let price = 0;
  //   for (const param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  const checkOutCancelHandler = () => {
    props.history.goBack();
  };
  const checkOutContineHandler = () => {
    //console.log(this.props.match.path);
    props.history.replace('checkout/contact-data');
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckOutSummary
          ingredients={props.ings}
          checkOutContinue={checkOutContineHandler}
          checkOutCancel={checkOutCancelHandler}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};
export default connect(mapStateToProps)(Checkout);
