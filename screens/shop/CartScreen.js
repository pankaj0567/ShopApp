import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, ForceTouchGestureHandler } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import * as cartActions from '../store/actions/cart'
import * as ordersActions from '../store/actions/orders'

const CartScreen = props => {
    const totalAmount = useSelector(state=>state.cart.totalAmount)
    const cartItem = useSelector(state=>{
        const transformCartItems=[];
        for(const key in state.cart.items){
            transformCartItems.push({
                productId: key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            })
        }
        return transformCartItems.sort((a,b)=>{
            a.productId > b.productId ? 1 : -1;
        });
    })

    const dispatch = useDispatch();

    //const cartTotalAmount = useSelector(state=>state.cart.totalAmount);

    return (
        <View style={styles.screen}>
            <View  style={styles.summary}>
                <Text  style={styles.summaryText}>Total : ₹
                <Text  style={styles.amount}>{totalAmount.toFixed(2)}</Text></Text>
                <Button 
                    color={Colors.accent} 
                    title="Order Now" 
                    onPress={()=>{
                           // props.navigation.navigate('Orders');
                        dispatch(ordersActions.addOrder(cartItem,totalAmount))}}
                     />
            </View>
            <View>
               <FlatList 
               data={cartItem}
             keyExtractor={item=>item.productId}
             renderItem = {itemData => <CartItem  
                            quantity = {itemData.item.quantity}
                            title = {itemData.item.productTitle}
                            amount = {itemData.item.sum}
                            deletable
                            onRemove = {()=>{dispatch(cartActions.removeFromCart(itemData.item.productId))}}
             
                            />}
               />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen : { 
        margin : 20
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:20,
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height: 2},
        shadowRadius:8,
        elevation : 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText : {
        fontFamily :'open-sans-bold',
        fontSize:20

    },
    amount:{
        color:Colors.accent
    }
})

export default CartScreen;

export const screenOptions = navData =>{
    return {
        headerTitle: 'Your Cart'
    }
}