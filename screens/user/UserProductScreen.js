import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../store/actions/product'

const UserProductScreen = props => {
    const userProduct = useSelector(state => state.products.userProduct);
    const dispatch = useDispatch();

    const deleteHandler = id => {
        Alert.alert("Are you sure?", "Do you really wnat to delete this item?",
            [
                {
                    text: 'No', style: 'default'
                },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(productActions.deleteProduct(id));
                    }
                }
            ]
        )
    }
    return (
        <FlatList
            data={userProduct}
            keyExtractor={item => item.id}
            renderItem={renderData => (
                <ProductItem
                    image={renderData.item.imageUrl}
                    title={renderData.item.title}
                    price={renderData.item.price}
                    onSelect={() => { }}

                >
                    <Button color={Colors.Primary} title="Edit" onPress={() => {
                        props.navigation.navigate('Edit', { productId: renderData.item.id })
                    }} />
                    <Button color={Colors.Primary} title="Delete" onPress={() => { deleteHandler(renderData.item.id) }} />
                </ProductItem>
            )}
        />
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item
                    title="Menu"
                    iconName="md-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => { navData.navigation.navigate('Edit', { productId: '' }) }}
                />
            </HeaderButtons>
        )
    }
}
export default UserProductScreen;