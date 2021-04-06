import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useCallback, useEffect, useReducer, useState,useLayoutEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import  Colors  from "../constants/Colors"
import * as authActions from './store/actions/auth';


const StartupScreen = props =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        const tryLogin = async () => {
        const userData = await AsyncStorage.getItem('userData');
        console.log('userData');
        console.log(userData);
        if(!userData){
           // props.navigation.navigate('Auth');
           dispatch(authActions.setDidTryAl());
            return;
        }
        const transformedData = JSON.stringify(userData);
        const {token,userId,expiryDate} = transformedData;
        const expirationDate = new Date(expiryDate);
        if(expirationDate<= new Date() || !token || !userId){
           // props.navigation.navigate('Auth');
           dispatch(authActions.setDidTryAl());
            return;
        }

        const expirationTime =  expirationDate.getTime() - new Date().getTime();

        //props.navigation.navigate('Shop');
        dispatch(authActions.authenticate(userId,token,expirationTime));
    };

    tryLogin();
    },[dispatch])

    return (
        <View>
            <ActivityIndicator size="large" color={Colors.Primary} />
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})


export default StartupScreen;