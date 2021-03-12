import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {
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

  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkOutContineHandler = () => {
    //console.log(this.props.match.path);
    this.props.history.replace('checkout/contact-data');
  };
  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckOutSummary
            ingredients={this.props.ings}
            checkOutContinue={this.checkOutContineHandler}
            checkOutCancel={this.checkOutCancelHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};
export default connect(mapStateToProps)(Checkout);
