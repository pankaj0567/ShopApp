import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CartItem = props=>{
    return(
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}> ₹{props.amount.toFixed(2)} </Text>
               { props.deletable && (<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name="md-trash"
                        size={23}
                        color = "red"
                    />
                </TouchableOpacity>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20
    },
    itemData:{
        flexDirection:'row',
        alignItems: 'center'
    },
    quantity:{
        fontFamily:'open-sans',
        color:'#888',
        fontSize:16
    },
    mainText:{
        fontSize:'open-sans-bold',
        fontSize:16
    },
    amount:{

    },
    deleteButton:{
        marginLeft:20
    }
})

export default CartItem;