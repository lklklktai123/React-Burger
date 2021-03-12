import * as actionType from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = name => {
  return {
    type: actionType.ADD_INGREDIENTS,
    ingredientsName: name,
  };
};
export const removeIngredient = name => {
  return {
    type: actionType.REMOVE_INGREDIENTS,
    ingredientsName: name,
  };
};
export const setIngredient = ingredients => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredient = () => {
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(reponse => {
        //  console.log(reponse);
        dispatch(setIngredient(reponse.data));
      })
      .catch(error => {
        //console.log(error);
        this.setState({ error: true });
      });
  };
};
