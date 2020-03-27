import axios from 'axios';
import {saveDishValues} from '../utilityFunctions'

//ACTION TYPE
const ADDING_INGREDIENTS = 'ADDING_INGREDIENTS';

const FINALIZE_INGREDIENT = "FINALIZE_INGREDIENT"

const CONSOLIDATE_DATA = 'CONSOLIDATE_DATA';

//ACTION CREATOR
const addingIngredients = (ingredients, uri) => {
    return {
       type: ADDING_INGREDIENTS,
       ingredients,
       uri
    };
 };

const finalizingIngredients = (ingredients, userIngredients, name) => {
  return {
    type: FINALIZE_INGREDIENT,
    ingredients,
    userIngredients,
    name,
  };
};

const consolidatingDataForAPI = consolidated => {
  return {
    type: CONSOLIDATE_DATA,
    consolidated,
  };
};

//THUNK
export const depositClarifaiData = (data, uri) => {
  return dispatch => {
    try {
      console.log("THUNK DATA: ", uri)
      dispatch(addingIngredients(data, uri))
    } catch (error) {
      console.error(error)
    }
  }
}

export const finalizeIngredients = (ingredients, userIngredients, name) => {
  return dispatch => {
    try {
      dispatch(finalizingIngredients(ingredients, userIngredients, name));
    } catch (error) {
      console.error(error);
    }
  };
};

export const consolidatingData = consolidated => {
  return dispatch => {
    try {
      dispatch(consolidatingDataForAPI(consolidated));
      //console.log('secondtime userDish', consolidated);
    } catch (error) {
      console.error(error);
    }
  };
};

export const createDish =  (dishNut, formvalues, ingredientArray) => {
  return async dispatch => {
    try {
      saveDishValues(dishNut, formvalues)
      // const newDish = await axios.post('https://daily-dose-server.herokuapp.com/api/dishes', updatedDish)
      let dataForPost = {
        dish: dishNut,
        ingredients: ingredientArray
      }
      const {data} = await axios.post('http://localhost:8080/api/dishes', dataForPost)
    } catch (error) {
        console.error(error)
    }
  }
}

//INITIAL STATE
const initialState = {
  imgUrl: '',
  name: '',
  ingredients: [
    // {
    //   name: 'sauce',
    //   quantity: '4',
    //   measurement: 'cup',
    // },
    // {
    //   name: 'pasta',
    //   quantity: '0',
    //   measurement: 'oz',
    // },
  ],
  userAddedIngredients: [
    // { name: 'Truffles', quantity: '1', measurement: 'oz' },
  ],
  finalIngredients: [], // [{name: 'rice', quantity: '1', measurement: 'cup'}, {name: 'chickpeas', quantity: '10', measurement: 'oz'}, 'chickpeas rice']
  consolidatedData: [], //use for API call ['1 cup rice', '10 oz chickpeas']
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_INGREDIENTS:
      const arr = action.ingredients
      let newArr = arr.map((obj) => {
        return {
          name: obj.name,
          quantity: "1",
          measurement: "oz"
        }
      })
      let clonedIngredients = {...state}
      clonedIngredients.ingredients = newArr
      clonedIngredients.imgUrl = action.uri
      return clonedIngredients
    case FINALIZE_INGREDIENT:
      let clonedState = {...state}
      clonedState.finalIngredients = [...action.ingredients, ...action.userIngredients]
      clonedState.name = action.name
      return clonedState
    case CONSOLIDATE_DATA:
      return { ...state, consolidatedData: action.consolidated };
    default:
      return state;
  }
};

export default reducer;
