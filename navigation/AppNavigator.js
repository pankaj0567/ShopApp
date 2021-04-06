import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import StartupScreen from '../screens/StartupScreen';
import { AdminNavigator, AuthNavigator, ProductsNavigator, ShopNavigator} from './ShopNavigator'


const AppNavigator = props =>{
    const navRef = useRef();
    const isAuth = useSelector(state=>!!state.auth.token);
    const didTryAutoLogin = useSelector(state=>state.auth.didTryAutoLogin);

    // useEffect(()=>{
    //     if(!isAuth){
    //         navRef.current.dispatch(
    //             NavigationActions.navigate({
    //                 routeName: 'Auth'
    //             })
    //         );
    //     }
    // },[isAuth]);

    console.log('app navigator');
    console.log(isAuth);
    console.log(didTryAutoLogin);

    return (
        <NavigationContainer>
        
        {isAuth && <ShopNavigator />}
        { !isAuth && didTryAutoLogin &&  <AuthNavigator />}
        { !isAuth && !didTryAutoLogin && <StartupScreen /> }
        </NavigationContainer>
    )
}

export default AppNavigator;