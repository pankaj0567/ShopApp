import PRODUCTS from "../../../data/dummy-data";
import Product from "../../../models/product";
import { DELETE_PRODUCT, SET_PRODUCTS } from "../actions/product";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../actions/product";

const initialState = {
    availableProducts : PRODUCTS,
    userProduct : PRODUCTS.filter(p=>p.ownerId == 'u1')
}

export default (state = initialState,action) =>{
    switch (action.type) {
        case SET_PRODUCTS:
            console.log('set products called')
            console.log(action)
            return {
                availableProducts: action.products,
                userProduct: action.products.filter(p=>p.ownerId == 'u1')
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
               action.productData.id,
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            )
            return {
                ...state,
                availableProducts:state.availableProducts.concat(newProduct),
                userProduct:state.userProduct.concat(newProduct)
            }
    case UPDATE_PRODUCT:
        console.log('UPDATE_PRODUCT');
        console.log(action.pid)
            const productIndex = state.userProduct.findIndex(
                prod=>prod.id ===action.pid
            );
            const updatedProduct = new Product(
                action.pid,
                state.userProduct[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProduct[productIndex].price
            );

            console.log(updatedProduct);
            const updatedUserProducts = [...state.userProduct];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(
              prod => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
              ...state,
              availableProducts: updatedAvailableProducts,
              userProduct: updatedUserProducts
            };


           

    case DELETE_PRODUCT:
            return {
                ...state,
                userProduct: state.userProduct.filter(p=>p.id!=action.pid),
                availableProducts:state.availableProducts.filter(p=>p.id!=action.pid),
            }
    }
   return state;
}