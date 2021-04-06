import Product from "../../../models/product";

export const DELETE_PRODUCT="DELETE_PRODUCT";
export const CREATE_PRODUCT="CREATE_PRODUCT";
export const UPDATE_PRODUCT="UPDATE_PRODUCT";
export const SET_PRODUCTS='SET_PRODUCTS';

export const fetchProducts = () => {
    try{
        return async (dispatch,getState) =>{
            const userId =getState().auth.userId;
            const response = await fetch('https://shopapp-785d1-default-rtdb.firebaseio.com/products.json');
            
            if(!response.ok)
            {
                throw new Error("Something went wrong!");
            }

            const respData = await response.json();
            let loadedProducts=[];
            for(const key in respData){
                loadedProducts.push(
                    new Product(
                        key,
                        respData[key].ownerId,
                        respData[key].title,
                        respData[key].imageUrl,
                        respData[key].description,
                        respData[key].price
                    )
                )
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod=>prod.ownerId===userId)
            })
        }
    } catch (error) {
        throw error;
    }
  
}

export const deleteProduct=(productId)=>{
    return async (dispatch,getState)=>{
        const token = getState().auth.token;
        await fetch(`https://shopapp-785d1-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,{
            method:'DELETE'
    });


        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        });
    }
    
}

export const createProduct=(title,description,imageUrl,price)=>{
    return async (dispatch,getState)=>{
        const token = getState().auth.token;
        const userId =getState().auth.userId;
        const payload = JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            ownerId: userId
            });
            let response;
            try {
            response = await fetch(`https://shopapp-785d1-default-rtdb.firebaseio.com/products.json?auth=${token}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: payload
            });
        } catch (error) {
            console.log(error);
        }
        
        const respDate= await response.json();
        
        

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: respDate.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }})
        }
}


export const updateProduct=(id,title,description,imageUrl,price)=>{
    return async (dispatch,getState)=>{
        const token = getState().auth.token;
        const userId =getState().auth.userId;
      const response=  await fetch(`https://shopapp-785d1-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                    })
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
              }

            dispatch({
                type: UPDATE_PRODUCT,
                pid:id,
                productData: {
                    title,
                    description,
                    imageUrl
                }
            });
    }
   
}