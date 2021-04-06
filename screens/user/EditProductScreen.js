import React, { useCallback, useEffect, useReducer, useState,useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Platform,KeyboardAvoidingView, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import * as productActions from '../store/actions/product'

const UPDATE_FORM = ' UPDATE_FORM';
const FORM_INPUT_UPDATE=(state,action)=>{
    if(action.type===UPDATE_FORM){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        };
    }

    return state;
}


const EditProductScreen = props => {
    const prodId = props.route.params? props.route.params.productId: null;
    const editedProduct = useSelector(state => state.products.userProduct.find(p => p.id == prodId));


    const [formState,dispatchFormState] = useReducer(FORM_INPUT_UPDATE,{
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description:  editedProduct ? editedProduct.description : ''

        },
        inputValidities:{
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    })


    const dispatch = useDispatch();

    
  const submitHandler = useCallback(() => {
    console.log('submit handler called')
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    if (editedProduct) {
      console.log('submit handler called updated')
      console.log(prodId)
      console.log(formState.inputValues)
      dispatch(
        productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    } else {
      console.log('submit handler called add')
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

    useEffect(()=>{
      //console.log(props);
        props.navigation.setOptions({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item
                    title="Save"
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitHandler}
                />
            </HeaderButtons>
        )
         })
    },[props.navigation,submitHandler])


    const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
          console.log('inputChangeHandler called ');
          console.log(inputIdentifier);
          console.log(inputValue);
          console.log(inputValidity);
          dispatchFormState({
            type: UPDATE_FORM,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={1}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                    id="title"
                    label="Title"
                    errorText="Please enter a valid title!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    required
                    />
                    <Input
                    id="imageUrl"
                    label="Image Url"
                    errorText="Please enter a valid image url!"
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={!!editedProduct}
                    required
                    />
                    {editedProduct ? null : (
                    <Input
                        id="price"
                        label="Price"
                        errorText="Please enter a valid price!"
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />
                    )}
                    <Input
                    id="description"
                    label="Description"
                    errorText="Please enter a valid description!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid={!!editedProduct}
                    required
                    minLength={5}
                    />
                </View>
            </ScrollView>
      </KeyboardAvoidingView>
    )
}

export const screenOptions = navData => {
    //const submitFn =  navData.route.params? navData.route.params.submit: null;
    const routeParams = navData.route.params? navData.route.params : {}
    return {
        headerTitle: routeParams.productId ? 'Edit Product' : 'Add Product',
      
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;