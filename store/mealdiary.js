import Axios from "axios"

//ACTION TYPE
const GET_DISHESBYDATE = 'GET_DISHESBYDATE'

const GET_DISH_INFO = 'GET_DISH_INFO'

//ACTION CREATOR
const getDishesByDate = (dishes) => {
    return {
        type: GET_DISHESBYDATE,
        dishes,
    }
}

const getDishInfo = (dishObj) => {
    return {
        type: GET_DISH_INFO,
        dishObj

    }
}

//THUNK
export const fetchDishes = (date) => {
    return async dispatch => {
      try {
          console.log('TRYING TO MAKE AXIOS CALL', date)
        //const {data} = await Axios.get(`https://daily-dose-server.herokuapp.com/api/userDish/${date}`)
        const {data} = await Axios.get(`http://localhost:8080/api/userDish/${date}`)
        console.log('ALL DISHES BY DAY FROM SERVER: ', data)  
        dispatch(getDishesByDate(data))
      } catch (error) {
        console.error(error)
      }
    }
  }

export const fetchDishInfo = (dishId) => {
    return async dispatch => {
        try {
           console.log('PREPARING TO fetchDishInfo: ', dishId)
           //const {data} = await Axios.get(`https://daily-dose-server.herokuapp.com/api/userDish/${dishId}`)
           const {data} = await Axios.get(`http://localhost:8080/api/userDish/dishIngredient/${dishId}`)
           console.log('DISH WITH INGREDIENTS BY DAY FROM SERVER: ', data)  
           dispatch(getDishInfo(data)) 
        } catch (error) {
            console.error(error)
        }
    }
} 

//INITIAL STATE
const initialState = {
    completeDishInfo: {}, //this will be used to load nutritional data on Dish Screen
    dishByDate: [], 
    breakfast: [
       {
        id: 2,
        mealTypes: 'breakfast',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 1,   
        dish: {name: 'soup'},
       },
       {
        id: 3,
        mealTypes: 'breakfast',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 2,  
        dish: {name: 'kale'},
       },
       {
        id: 4,
        mealTypes: 'breakfast',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 3,     
        dish: {name: 'cheerios'},
       },
    ],
    lunch: [
        {
        id: 5,
        mealTypes: 'lunch',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 4,            
        dish: {name: 'pizza'},
        }
    ],
    dinner:[
        {
        id: 6,
        mealTypes: 'dinner',
        date: '2020-09-21',
        createdAt: '2020-03-25T21:03:34.998Z',
        updatedAt: '2020-03-25T21:03:34.998Z',
        userId: 1,
        dishId: 6,       
        dish: {name: 'salad'},
        }
    ]
}

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DISHESBYDATE:
            let clonedState = {...state}
            let dishes = action.dishes
            let breakfastcloned = dishes.filter((obj) => {
                if (obj.mealTypes === 'breakfast') {
                    return true 
                } else {
                    return false 
                }
            })
            let lunchcloned = dishes.filter((obj) => {
                if (obj.mealTypes === 'lunch') {
                    return true 
                } else {
                    return false 
                }
            })
            let dinnercloned = dishes.filter((obj) => {
                if (obj.mealTypes === 'dinner') {
                    return true 
                } else {
                    return false 
                }
            })        
            clonedState.breakfast = breakfastcloned
            clonedState.lunch = lunchcloned
            clonedState.dinner = dinnercloned
            clonedState.dishByDate = action.dishes 
            return clonedState
        case GET_DISH_INFO:
            let stateClone = {...state}
            stateClone.completeDishInfo = action.dishObj
            return stateClone
        default:
            return state;
    }
}
export default reducer; 