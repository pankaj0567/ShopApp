import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button, ActivityIndicator } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../store/actions/product';


const ProductOverviewScreen = props=>{
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(true);
    const [isRefreshing,setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const selectItemHandler = (id,title) => {
        props.navigation.navigate('ProductsDetail',
        {
            productId: id,
            productTitle: title
        })
    }

    const loadingProducts = useCallback(async ()=>{
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
        
    },[dispatch,setIsLoading,setError]);

    useEffect(()=>{
        setIsLoading(true);
        loadingProducts().then(()=>{
            setIsLoading(false);
        });
        
    },[dispatch,setIsLoading,setError])


    useEffect(()=>{
        const unsubscribe = props.navigation.addListener(
            'focus',
            loadingProducts
          );
          return () => {
            unsubscribe();
          };
    },[loadingProducts])

    useEffect(()=>{
        setIsLoading(true);
        loadingProducts().then(() => {
          setIsLoading(false);
        });
    },[dispatch,loadingProducts])

    if(error){
        return (
            <View>
                <Text>An error occurred!</Text>
                <Button title="Try again" onPress={loadingProducts} color={Colors.Primary} />
            </View>
        )
    }

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.Primary} />
            </View>
        )
    }

    if(!isLoading && products.length === 0){
        return(
            <View>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        )
    }

    return (
        <View>
        <FlatList 
            onRefresh={loadingProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item=>item.id}
            renderItem={renderData=>(
                <ProductItem 
                image = {renderData.item.imageUrl}
                title = {renderData.item.title}
                price = {renderData.item.price}
                onAddToCart ={()=>{
                    
                }}
                onSelect = {()=>{  selectItemHandler(renderData.item.id,renderData.item.title) }}                
                >
                    <Button color={Colors.Primary} title="View Details" onPress={()=>selectItemHandler(renderData.item.id,renderData.item.title)} />
                    <Button color={Colors.Primary} title="To Cart" onPress={()=>{dispatch(cartActions.addToCart(renderData.item))}} />
                </ProductItem>
            )}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
})


export default ProductOverviewScreen;



export const screenOptions = navData =>{
    return {
        headerTitle: 'All Products',
        headerLeft: ()=> (
            <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                <Item
                    title= "Menu"
                    iconName="md-menu"
                    onPress = {()=>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: ()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Cart"
                    iconName= "md-cart"
                    onPress={()=>{
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
        )
    }
}