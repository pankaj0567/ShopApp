import React from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import { useEffect } from 'react/cjs/react.development';
import * as ordersActions from '../store/actions/orders'

const OrderScreen = props =>{
    const orders = useSelector(state=>state.orders.orders)
    const dispatch = useDispatch();


    useEffect(()=>{
      dispatch(ordersActions.fetchOrders());
    },[dispatch])


    return (
        <FlatList 
            data={orders}
            keyExtractor={item=>item.id}
            renderItem = {renderData => <OrderItem items={renderData.item.items} amount ={renderData.item.totalAmount} date={renderData.item.readableDate} />}
        />
    )

}


export default OrderScreen;

export const screenOptions = navData =>{
    return {
      headerTitle: 'Your Orders',
      headerLeft: ()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton} >
          <Item 
            title="Menu"
            iconName= "md-menu"
            onPress={()=>{
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
    }
  }