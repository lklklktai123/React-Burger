import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Layout/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
const Orders = props => {
  const { token, userId } = props;
  useEffect(() => {
    props.onFetchOrders(token, userId);
  }, [token, userId]);

  let orders = <Spinner />;

  if (!props.loading) {
    props.orders.forEach(element => {
      //   console.log(element.id + 'ssssssssssssss');
    });
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
