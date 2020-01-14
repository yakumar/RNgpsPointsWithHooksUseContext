import React, {useState, useReducer} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';

import {navigate} from '../navigationRef'

const MyContext = React.createContext();

const letsAsync = async(obj)=>{
  await AsyncStorage.multiSet([
    ['token', JSON.stringify(`${obj.token}`)],
    ['email', JSON.stringify(`${obj.email}`)],
    ['id', JSON.stringify(`${obj.id}`)],
  ]);
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP':
      console.log('data from reducer', action.payload);
     

      const obj = action.payload;
      letsAsync(obj)
      

      return {...state, auth: obj, errorMessage:''};
    case 'SIGNIN':
      console.log('data from reducer', action.payload);
      const signINDetails = action.payload;
      letsAsync(signINDetails)

      return {...state, auth: signINDetails, errorMessage:''};

    case 'SIGNOUT':
      console.log('data from reducer', action.payload);
      const signO = action.payload;

      return {...state, auth: signO, errorMessage:''};
    case 'CURRENTUSER':
      console.log('data from reducer', action.payload);
      const signedUser = action.payload;

      return {...state, auth: signedUser,errorMessage:''};

      case "GOTERROR":
        console.log('Got error reducer',action.payload)
        return {...state, errorMessage:action.payload}

    default:
      return state;
  }
};

export const AuthProvider = (props) => {

  //console.log('props of AUTH:', props)
  const initialState = {
    auth: {
      id: '',
      email: '',
      password: '',
      loggedIn: false,
      token: null,
     
    },
    errorMessage:''
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const localState = async()=>{
    const token = await AsyncStorage.getItem("token")

    if(token){
      navigate('Tracklistscreen')

    }else{
      navigate('SignupScreen')
    }

  }

  const signInFunc = async (email, password) => {
    try {
      //console.log(email, password)

     
      const addData = await axios({
        method: 'post',
        url:
          Platform.OS === 'android'
            ? `http://192.168.29.143:8080/api/login`
            : `http://localhost:8080/api/login`,

        data: {
          email: email,
          password: password,
        },
      });
     // console.log('Sign IN Data: ', addData.data);

      if (addData.data != null) {
        //AsyncStorage.setItem('token', JSON.stringify(`${addData.data.token}`)).then(())
        try {

          // await AsyncStorage.multiSet([
          //   ['token', JSON.stringify(`${addData.data.token}`)],
          //   ['email', JSON.stringify(`${addData.data.email}`)],
          //   ['id', JSON.stringify(`${addData.data.id}`)],
          //   ['test', JSON.stringify(`pora REYY adi kooda rada neeku ..... poyyi dooku`)],
          // ]);

          // await AsyncStorage.setItem("token", addData.data.token)
          // await AsyncStorage.setItem("email", addData.data.email)
          // await AsyncStorage.setItem("id", addData.data.id)
        } catch (e) {
          console.log(e);
        }

        navigate('Tracklistscreen');
        dispatch({
          type: 'SIGNIN',
          payload: {
            email: addData.data.data.email,
            password: addData.data.data.password,
            id: addData.data.data.id,
            token: addData.data.token,
            loggedIn: true,
          },
        });
      }
    } catch (e) {
      console.log('from sign IN :',e.response.data);
      dispatch({type:"GOTERROR", payload:e.response.data})
    }
  };

  //JSON.stringify(

  const signUpFunc = async (email, password) => {
    try {
      //console.log(email, password)

      const addData = await axios({
        method: 'post',
        url:
          Platform.OS === 'android'
            ? `http://192.168.29.143:8080/api/signup`
            : `http://localhost:8080/api/signup`,

        data: {
          email: email,
          password: password,
        },
      });
      console.log('Signup Data: ', addData.data);

      if (addData.data != null) {
        const {token, id, email} = addData.data;

      

       navigate('Tracklistscreen');
        dispatch({
          type: 'SIGNUP',
          payload: {
            email: addData.data.data.email,
            password: addData.data.data.password,
            loggedIn: true,
            token: addData.data.token,
          },
        });
      }
    } catch (e) {
      console.log('from sign UP :',e);
      dispatch({type:"GOTERROR", payload:e.response.data})
    }
  };
  const signOutFunc = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');

    await AsyncStorage.removeItem('id');

    dispatch({
      type: 'SIGNOUT',
      payload: {email: '', password: '', token: '', id: '', loggedIn: false},
    });
  };
  const currentUser = async () => {
    const newData = await axios({
      method: 'get',
      url:
        Platform.OS === 'android'
          ? 'http://192.168.29.143:8080/api'
          : `http://localhost:8080/api`,
    });

    dispatch({
      type: 'CURRENTUSER',
      payload: {email: newData.data.email, id: newData.data.id, loggedIn: true},
    });
  };

  return (
    <MyContext.Provider
      value={{
        localState, localState,
        errorState:state.errorMessage,
        authState: state.auth,
        signUp: signUpFunc,
        signIn: signInFunc,
        signOut: signOutFunc,
        currentUser: currentUser,
      }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContext;
