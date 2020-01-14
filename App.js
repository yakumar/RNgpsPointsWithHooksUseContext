import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Trackdetailscreen from './src/screens/Trackdetailscreen';
import Accountscreen from './src/screens/Accountscreen';
import Trackcreatescreen from './src/screens/Trackcreatescreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import Tracklistscreen from './src/screens/Tracklistscreen';

import {AuthProvider} from './src/context/AuthContext';
import {TrackContextProvider} from './src/context/TrackContext'

import {setNavigator} from './src/navigationRef'

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignupScreen: SignupScreen,
    SigninScreen: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      Tracklistscreen: Tracklistscreen,
      Trackdetailscreen: Trackdetailscreen,
    }),
    Trackcreatescreen: Trackcreatescreen,
    Accountscreen: Accountscreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackContextProvider>
    <AuthProvider>
    

      <App ref={
        (navigator)=>{setNavigator(navigator)}
      }/>
      
    </AuthProvider>
    </TrackContextProvider>
  );
};
