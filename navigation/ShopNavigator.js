import React from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import ProductOverviewScreen,{screenOptions as productOverviewScreenOptions} from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen ,{screenOptions as productDetailScreenOptions} from '../screens/shop/ProductDetailScreen';
import CartScreen ,{screenOptions as cartScreenOptions}from '../screens/shop/CartScreen';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import CartItem from '../models/cart-item';

import OrderScreen,{screenOptions as ordersScreenOptions} from '../screens/shop/OrderScreen';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import UserProductScreen,{screenOptions as userProductsScreenOptions} from '../screens/user/UserProductScreen';
import EditProductScreen,{screenOptions as editProductsScreenOptions} from '../screens/user/EditProductScreen';
import AuthScreen,{screenOptions as authScreenOptions}  from '../screens/user/AuthScreen';
import * as authActions from '../screens/store/actions/auth';

const defaultNavOptions={
    headerStyle:{
        backgroundColor: Colors.Primary
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily: 'open-sans'
    },
    headerTintColor: 'white'
};

const ProductStackNavigator = createStackNavigator();
export const ProductsNavigator =props=>{
    return (
        <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductStackNavigator.Screen 
                    name="ProductsOverview" 
                    component = {ProductOverviewScreen}
                    options={productOverviewScreenOptions}
                    />
            <ProductStackNavigator.Screen 
            name="ProductsDetail" 
            component = {ProductDetailScreen}
            options = {productDetailScreenOptions}
            />
            <ProductStackNavigator.Screen name="Cart" component = {CartScreen}
            options = {cartScreenOptions}
            />
        </ProductStackNavigator.Navigator>
    )
}

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator =()=>
{
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrdersStackNavigator.Screen name="Orders" component={OrderScreen}
                options = {ordersScreenOptions}
            />
        </OrdersStackNavigator.Navigator>
    )
}

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator =()=>{
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen name="User" component={UserProductScreen}
                options={userProductsScreenOptions}
            />
            <AdminStackNavigator.Screen name="Edit" component={EditProductScreen}
                
            />
            {/* <AdminStackNavigator.Screen name="Auth" component={AuthScreen}
                 options={authScreenOptions}
            /> */}
        </AdminStackNavigator.Navigator>
    )
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () =>{
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen}
                 options={authScreenOptions} />
        </AuthStackNavigator.Navigator>
    )
}


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator
        // drawerContent ={ props=> {
        //     return (
        //         <View style={{flex:1,paddingTop:20}}>
        //             <SafeAreaView forceInset = {{top: 'always', horizontal:'never'}}>
        //                 <Button

        //                 />
        //             </SafeAreaView>
        //         </View>
        //     )
        // }}
        drawerContent={props=>{
            return (
                <View style={{flex:1,paddingTop:20}}>
                    <SafeAreaView forceInset={{top:'always', horizontal: 'never'}}>
                        <DrawerItemList {...props} />
                        <Button
                            title="Logout"
                            color= {Colors.Primary}
                            onPress={()=>{
                                dispatch(authActions.logout());
                            }}
                        />
                    </SafeAreaView>
                </View>
            )
        }}
        drawerContentOptions = {{
            activeTintColor:Colors.Primary
        }}>
            <ShopDrawerNavigator.Screen name = "Products" component={ProductsNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS==="android"?"md-cart":"ios-cart"}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen name = "Orders" component={OrdersNavigator} 
                options={{
                    drawerIcon:props=>(
                        <Ionicons
                            name={Platform.OS==="android"?"md-list":"ios-list"}
                            size={23}
                            color={props.color}
                        />
                        )
                }}
            />

            <ShopDrawerNavigator.Screen name = "Admin" component={AdminNavigator}
                options = {{
                    drawerIcon: props=>(
                        <Ionicons 
                        name={Platform.OS==="android"?"md-create":"ios-create"}
                        size={23}
                        color={props.color}
                        />
                        )
                }}
            />
        </ShopDrawerNavigator.Navigator>
    )
}