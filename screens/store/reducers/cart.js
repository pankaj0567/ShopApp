import CartItem from "../../../models/cart-item";
import {  ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
    items : {},
    totalAmount : 0
}

export default (state = initialState,action)=>{
    //return state;


    // console.log('cart reducer');
    // console.log(action);
    // return state;
    switch (action.type) {
        case ADD_TO_CART:
                const addedProduct = action.product;
                const prodPrice = addedProduct.price;
                const prodTitle = addedProduct.title;
                
                let updatedOrNewCartItem;

                if(state.items[addedProduct.id]){
                    const updatedCartItem = new CartItem(
                        state.items[addedProduct.id].quantity + 1,
                        prodPrice,
                        prodTitle,
                        state.items[addedProduct.id].sum + prodPrice
                    )
                    updatedOrNewCartItem = updatedCartItem;
                    //
                }
                else {
                    const newCartItem = new CartItem(1,prodPrice,prodTitle,prodPrice)
                    updatedOrNewCartItem = newCartItem;
                }
                return {
                    ...state,
                    items:{...state.items,[addedProduct.id]:updatedOrNewCartItem},
                    totalAmount : state.totalAmount + prodPrice
                }

        case REMOVE_FROM_CART:
            console.log(REMOVE_FROM_CART);
            console.log(state)
                const selectedCartItem = state.items[action.pid];
                const currentQty = selectedCartItem.quantity;
                let updatedCartItems;
                if(currentQty >1){
                    const updatedCartItem = new CartItem(
                        selectedCartItem.quantity -1,
                        selectedCartItem.productPrice,
                        selectedCartItem.productTitle,
                        selectedCartItem.sum - selectedCartItem.productPrice
                    )
                    updatedCartItems = {...state.items,[action.pid]: updatedCartItem}
                }
                else{
                    updatedCartItems = {...state.items}
                    delete updatedCartItems[action.pid];
                }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
               }
         case ADD_ORDER:
             return initialState;
         
        case DELETE_PRODUCT:
            if(!state.items[action.pid]){
                return state
            }

            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid];

            return {
                ...state,
                items : updatedItems,
                totalAmounta: state.totalAmount - itemTotal
            }

            default:
                return state;

        
    }
}