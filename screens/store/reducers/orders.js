import Order from "../../../models/order";
import Product from "../../../models/product";
import { ADD_ORDER, SET_ORDER } from "../actions/orders";

const initialState ={
    orders: []
}

export default (state=initialState,action)=>{
    switch (action.type) {
       case SET_ORDER:
           return {
            orders: action.orders
       };

        case ADD_ORDER:
            const newOrder = new Order(
                action.ordersData.id,
                action.ordersData.items,
                action.ordersData.amount,
                action.ordersData.date
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
      
    }

    return state;
}