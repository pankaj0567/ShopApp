import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from "../store/actions/auth";
import { useDispatch } from 'react-redux';

const UPDATE_FORM = ' UPDATE_FORM';
const FORM_INPUT_UPDATE =(state,action)=>{
  if(action.type == UPDATE_FORM){
    const updateValues={
      ...state.inputValues,
      [action.input]: action.value
    }

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }

    let updatedFormIsValid = true;
    for(const key in updatedValidities){
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updateValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    }
  }
  return state;
}


const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState();
   const dispatch = useDispatch();

   const[formState,dispatchFormState]= useReducer(FORM_INPUT_UPDATE,{
      inputValues:{
        email:'',
        password: ''
      },
      inputValidities:{
        email:false,
        password: false
      },
      formIsValid: false
   })


   useEffect(()=>{
     if(error){
       Alert.alert("An Error Occurred!",error,[{text:'Okay'}])
     }else{

     }
   })

   const authHandler = useCallback(async ()=>{
     setIsLoading(true);
     try {
       

     if(isSignUp){
      await dispatch(authActions.signUp(formState.inputValues.email,formState.inputValues.password));
     }else{
      await dispatch(authActions.login(formState.inputValues.email,formState.inputValues.password));
     }
     
     //props.naviagation.navigate('shop');
    } catch (error) {
      setError(error.message)
      setIsLoading(false);
   }
   },[dispatch,formState,isSignUp]);

   const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity)=>{
      dispatchFormState({
        type: UPDATE_FORM,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      })
   },[dispatchFormState])


  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
             {isLoading?<ActivityIndicator size="small" color={Colors.Primary} />:(<Button title={isSignUp?"Sign up":"Login"} color={Colors.primary} onPress={() => {authHandler() }} />)} 
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${!isSignUp?"Sign up":"Login"}`}
                color={Colors.accent}
                onPress={ ()=>
                 { setIsSignUp(prevState=>!prevState)}
                }
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions =()=> {
  return {
    headerTitle: 'Authenticate'
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
