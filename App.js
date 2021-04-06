import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { combineReducers, createStore,applyMiddleware } from 'redux';
import  productReducer from "./screens/store/reducers/product";
import  cartReducer from "./screens/store/reducers/cart";
import  ordersReducer from "./screens/store/reducers/orders";
import authReducer from "./screens/store/reducers/auth";
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';
import AppLoading from 'expo-app-loading';
import AppNavigator from './navigation/AppNavigator';
import ReduxThunk from 'redux-thunk';

const fetchFonts = ()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  });
}


export default function App() {
   
  const rootReducer = combineReducers({
    products:productReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
  });

  const store = createStore(rootReducer,applyMiddleware(ReduxThunk))
  const [fontLoaded,setFontLoaded] = useState(false);

  if(!fontLoaded){
    return (
      <AppLoading
       startAsync={fetchFonts}
       onFinish = {()=>{
            setFontLoaded(true);
          }}

          onError={console.warn}

      />
    )
  }

  return (
      <Provider store={store}>
         <AppNavigator>
         </AppNavigator>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
