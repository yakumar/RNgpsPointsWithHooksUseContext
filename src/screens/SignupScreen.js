import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableHighlight} from 'react-native';

import {Button, Header, Input, Text, Card} from 'react-native-elements';

import Spacer from '../components/Spacer';
import MyContext from '../context/AuthContext';

const SignupScreen = ({navigation}) => {
  const value = useContext(MyContext);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [errorMes, setErrorMes] = useState('');

  useEffect(()=>{

    value.localState()



  }, [])

  return (
    <Spacer just="center" ali="center" flexy={1}>

    <Text h3 h3Style={{color: 'red'}}>
    {value.errorState}
  </Text>
      <Text h4 h4Style={{color: 'pink'}}>
        Sign Up
      </Text>
      <Text h4 h4Style={{color: 'red'}}>
        {errorMes}
      </Text>

      <Spacer
        backColor="rgb(219, 46, 127)"
        width="90%"
        just="center"
        ali="center"
        borderRad={10}
        borderCol="red"
        borderWid={1}
        pad={15}>
        <Input
          labelStyle={{color: 'white'}}
          label="email"
          textContentType="emailAddress"
          autoCorrect={false}
          value={email}
          onChangeText={e => setEmail(e)}
        />
        <Input
          labelStyle={{color: 'white'}}
          label="password"
          textContentType="password"
          secureTextEntry={true}
          autoCorrect={false}
          value={password}
          onChangeText={e => {
            setPassword(e);
          }}
        />
        <Spacer space="0.1%" width="90%">
          <Button
            title="Submit"
            style={{marginTop: '10%'}}
            onPress={() => {
              if (email === '' || !email.includes('@')) {
                setErrorMes('Please enter valid email');
              } else if (password === '' || password.length < 6) {
                setErrorMes('Please enter valid password');
              } else {
                value.signUp(email, password);
                setEmail("")
                setPassword("")
                
              }
            }}
          />
        </Spacer>

        <Button
          style={styles.ButtonStyle}
          title="Sign IN"
          onPress={() => navigation.navigate('SigninScreen')}
        />
        <Button
          style={styles.ButtonStyle}
          title="Main Flow"
          onPress={() => navigation.navigate('mainFlow')}
        />
      </Spacer>
    </Spacer>
  );
};

const styles = StyleSheet.create({
  ButtonStyle: {
    margin: 5,
    width: '90%',
  },
});

SignupScreen.navigationOptions = () => {
  return {
    title: 'Home',

    header: (
      <Header
        centerComponent={{
          text: 'Sign Up',
          style: {color: 'black', fontSize: 20, fontWeight: '600'},
        }}
        backgroundColor="rgb(219, 46, 127)"
      />
    ),
  };
};

export default SignupScreen;
