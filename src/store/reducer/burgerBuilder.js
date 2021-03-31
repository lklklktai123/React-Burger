import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};
const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const addIngrdients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updateState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientsName],
    building: true,
  };
  return updateObject(state, updateState);
};
const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updateSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientsName],
    building: true,
  };
  return updateObject(state, updateSt);
};
const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 4,
    building: false,
  });
};
const fetchIngredientFail = state => {
  return updateObject(state, { error: true });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngrdients(state, action);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFail(state);
    default:
      return state;
  }
};
export default reducer;
