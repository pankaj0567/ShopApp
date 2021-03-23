import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as cartActions from '../store/actions/cart';


const ProductDetailScreen = props=>{
    //console.log('products details');
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state=>state.products.availableProducts.find(p=>p.id === productId))
    //console.log(selectedProduct);

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri:selectedProduct.imageUrl}} />
            <View style={styles.actions}>
                <Button
                    color = {Colors.Primary}
                    title="Add to Cart"     
                    onPress={()=>{
                        dispatch(cartActions.addToCart(selectedProduct))
                    }}           
                />
            </View>
            <Text style={styles.price}>₹{selectedProduct.price}</Text>
            <Text  style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    image:{
        width:'100%',
        height : 300
    },
    actions : {
        marginVertical : 10,
        alignItems : 'center'
    },
    price : {
        fontFamily:'open-sans-bold',
        marginVertical : 20,
        fontSize : 20 ,
        color : '#888',
        textAlign:'center'
    },
    description : {
        fontFamily:'open-sans',
        fontSize:14,
        textAlign : 'center',
        marginHorizontal : 20
    }
});

export default ProductDetailScreen;

export const screenOptions = navData =>{
    return {
       
       headerTitle: navData.route.params.productTitle
    }
}