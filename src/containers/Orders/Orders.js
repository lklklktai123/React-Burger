import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Layout/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
  state = {
    orders: null,
    loading: true,
  };
  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        const fetchedOrder = [];
        console.log(res);
        for (let key in res.data) {
          fetchedOrder.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrder });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = <Spinner />;
    if (this.state.orders)
      orders = this.state.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    return <div>{orders}</div>;
  }
}
export default withErrorHandler(Orders, axios);
