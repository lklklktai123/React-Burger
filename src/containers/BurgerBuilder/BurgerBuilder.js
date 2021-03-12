import React, { Component } from 'react';
import axios from '../../axios-orders';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls';
import Burger from '../../components/Layout/Burger/Burger';
import OrderSumary from '../../components/Layout/Burger/OrderSumary/OrderSumary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/AuxHight';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index';

export class BurgerBuider extends Component {
  // constructor(probs) {
  //   super(probs);
  //   this.state = {}
  // }
  state = {
    // ingredients: null,
    // totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };
  componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredients();
  }
  updatePurchaseState(ingredients) {
    // console.log(ingredients);
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updateCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updateCount;
  //   const priceAddition = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  // deleteIngresientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) return;
  //   const updateCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updateCount;
  //   const priceDeduction = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // this.props.location.search = `?ingredients=${this.state.ingredients}`;
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push('price=' + this.props.price);
    // const queryString = queryParams.join('&');
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout',
      //  search: `?${queryString}`,
    });
  };

  render() {
    const diabledInfo = { ...this.props.ings };
    for (const key of Object.keys(diabledInfo)) {
      diabledInfo[key] = diabledInfo[key] <= 0;
    }
    let orderSumary = null;

    let burger = this.props.error ? (
      <p>Ingredients cannot load</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      orderSumary = (
        <OrderSumary
          ingredients={this.props.ings}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onInGredientAdded}
            ingredientRemove={this.props.onInGredientRemove}
            disabled={diabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
    }
    // if (this.state.loading) {
    //   orderSumary = <Spinner />;
    // }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSumary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInGredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onInGredientRemove: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: path =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuider, axios));
