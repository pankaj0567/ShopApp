export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setDidTryAl=()=>{
    return {
        type: SET_DID_TRY_AL
    };
}

let timer;

export const authenticate = (userId,token,expiryTime)=>{
    return dispatch =>{
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ 
            type: AUTHENTICATE,
            userId: userId,
            token: token
        });
    }
}

export const signUp = (email, password) => {
    try {

        return async dispatch => {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0mFFcFSIGLAkIztKZk5BzOcDXOUSQNvI", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
            // if(!response.ok){
            //     throw new Error("Something went wrong!");
            // }

            const respData = await response.json();

            if (!response.ok) {
                const errorId = respData.error.message;
                let message = "Something went wrong";

                if (errorId === "EMAIL_EXISTS") {
                    message = "The Email already exists";
                }
                throw new Error(message);
            }

            dispatch(authenticate(respData.localId,respData.idToken, parseInt(respData.expiresIn)*1000));

            const expirationDate =new Date(new Date().getTime() + parseInt(respData.expiresIn)*1000);
            saveDataToStorage(respData.idToken,respData.localId,expirationDate);
        }

    } catch (error) {
        console.log(error);
    }
}




export const login = (email, password) => {
    try {

        return async dispatch => {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0mFFcFSIGLAkIztKZk5BzOcDXOUSQNvI", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
            const respData = await response.json();
            if (!response.ok) {
                const errorId = respData.error.message;
                let message = "Something went wrong";

                if (errorId === "EMAIL_NOT_FOUND") {
                    message = "The Email address could not be found!";
                } else if (errorId === "INVALID_PASSWORD") {
                    message = "The Password is not valid!";
                }
                throw new Error(message);
            }


            dispatch(authenticate(respData.localId,respData.idToken, parseInt(respData.expiresIn)*1000));
            const expirationDate =new Date(new Date().getTime() + parseInt(respData.expiresIn)*1000);
            saveDataToStorage(respData.idToken,respData.localId,expirationDate);
        }

    } catch (error) {
        console.log(error);
    }
}

export const logout = () =>{
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT
    }
}

const clearLogoutTimer = () => {
    if(timer){
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationTime =>{
    return dispatch=>{
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

const saveDataToStorage = (token,userId,expirationDate) => {
    AsyncStorage.setItem('userData',JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}