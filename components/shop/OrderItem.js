import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';

const OrderItem = props => {
    const [showDetails,setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>  ₹{Math.round(props.amount.toFixed(2)*100)/100} </Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
          
            <TouchableOpacity style={styles.button} onPress= {()=>{
                setShowDetails(prevState=> !prevState)
            }}>
                <Text style={{color:'white'}}>{showDetails? "Hide Details":"Show Details"}</Text>
            </TouchableOpacity>
            {showDetails && (<View style={styles.detailsItem}>
              { props.items.map(cartItem=>(
                                <CartItem
                                    key={cartItem.productId}
                                    quantity={cartItem.quantity}
                                    amount={cartItem.sum}
                                    title={cartItem.productTitle}
                                />
                            ))}
                </View>)}

        </View>
    )
}

const styles = StyleSheet.create({
    orderItem:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height: 2},
        shadowRadius:8,
        elevation : 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin:20,
        padding:10
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        marginBottom:15
    },
    totalAmount:{
        fontFamily: 'open-sans-bold',
        fontSize:16
    },
    date:{
        fontSize:16,
        fontFamily:'open-sans',
        color:'#888'
    },
    detailsItem: {
        width:'100%'
    },
    button:{
       marginHorizontal:90,
        backgroundColor:Colors.Primary,
        
            padding:10,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default OrderItem;