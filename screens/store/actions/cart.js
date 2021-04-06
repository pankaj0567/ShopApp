export const ADD_TO_CART ="ADD_TO_CART";
export const REMOVE_FROM_CART ="REMOVE_FROM_CART"

export const addToCart = (product)=>{
    //console.log('card action call')
    console.log('add to cart called ');
    console.log(product)
    return {
        type: ADD_TO_CART,
        product: product
    };
}

export const removeFromCart= productId =>{
    return {
        type: REMOVE_FROM_CART,
        pid: productId
    }
}