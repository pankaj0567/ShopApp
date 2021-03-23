import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ProductsNavigator, ShopNavigator} from './ShopNavigator'


const AppNavigator = props =>{
    return (
        <NavigationContainer>
           <ShopNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator;