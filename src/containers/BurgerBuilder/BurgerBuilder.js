import React, { Component } from 'react';
import axios from '../../axios-orders';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls';
import Burger from '../../components/Layout/Burger/Burger';
import OrderSumary from '../../components/Layout/Burger/OrderSumary/OrderSumary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/AuxHight';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuider extends Component {
  // constructor(probs) {
  //   super(probs);
  //   this.state = {}
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get('/ingredients.json')
      .then(reponse => {
        console.log(reponse);
        this.setState({ ingredients: reponse.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  }
  updatePurchaseState(ingredients) {
    console.log(ingredients);
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchaseable: sum > 0 });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  deleteIngresientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updateCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // this.props.location.search = `?ingredients=${this.state.ingredients}`;
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  };

  render() {
    const diabledInfo = { ...this.state.ingredients };
    for (const key of Object.keys(diabledInfo)) {
      diabledInfo[key] = diabledInfo[key] <= 0;
    }
    let orderSumary = null;

    let burger = this.state.error ? (
      <p>Ingredients cannot load</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      orderSumary = (
        <OrderSumary
          ingredients={this.state.ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientsAdded={this.addIngredientHandler}
            ingredientRemove={this.deleteIngresientHandler}
            disabled={diabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }
    if (this.state.loading) {
      orderSumary = <Spinner />;
    }
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
export default withErrorHandler(BurgerBuider, axios);
