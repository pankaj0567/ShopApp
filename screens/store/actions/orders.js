import Order from "../../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = 'SET_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    try {
        return async (dispatch, getState) => {
            let response;
            const date = new Date();
            const token = getState().auth.token;
            const userId =getState().auth.userId;
            response = await fetch(`https://shopapp-785d1-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: cartItems,
                    amount: totalAmount,
                    date: date.toISOString()
                })
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const respData = await response.json();


            dispatch({
                type: ADD_ORDER,
                ordersData: {
                    id: respData.name,
                    items: cartItems, amount: totalAmount
                }
            });
        }

    } catch (error) {

    }
}

export const fetchOrders = () => {
    try {
        return async (dispatch, getState) => {
            const userId =getState().auth.userId;
            const response = await fetch(`https://shopapp-785d1-default-rtdb.firebaseio.com/orders/${userId}.json`,
            {
            method: 'GET'});

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const respData = await response.json();
            let loadedOrders = [];
            for (const key in respData) {
                loadedOrders.push(
                    new Order(
                        key,
                        respData[key].items,
                        respData[key].amount,
                        new Date(respData[key].date)
                    )
                )
            }
            
            dispatch({
                type: SET_ORDER,
                orders: loadedOrders
            });
        }
    } catch (error) {
        throw error;
    }


}