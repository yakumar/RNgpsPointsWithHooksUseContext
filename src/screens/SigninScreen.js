import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import {Button, Header, Input, Text, Card} from 'react-native-elements';

import Spacer from '../components/Spacer';
import MyContext from '../context/AuthContext';

const SigninScreen = ({navigation}) => {
  const value = useContext(MyContext);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  
  console.log(value.errorState)
  

  return (
    <Spacer just="center" ali="center" flexy={1}>
    <Text h3 h3Style={{color: 'red'}}>
    {value.errorState}
  </Text>
      <Text h4 h4Style={{color: 'pink'}}>
        Sign IN !!
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
          onChangeText={e => setPassword(e)}
        />
        <Spacer space="0.1%" width="90%">
          <Button
            title="Submit"
            style={{marginTop: '10%'}}
            onPress={() => {
              value.signIn(email, password);
              
            }}
          />
        </Spacer>

        <Button
          style={styles.ButtonStyle}
          title="Sign Up"
          onPress={() => navigation.navigate('SignupScreen')}
        />
        <Button
          style={styles.ButtonStyle}
          title="Main Flow"
          onPress={() =>
            navigation.navigate('mainFlow', {
              contVal: value,
            })
          }
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

SigninScreen.navigationOptions = () => {
  return {
    title: 'Home',

    header: (
      <Header
        centerComponent={{
          text: 'Sign IN',
          style: {color: 'black', fontSize: 20, fontWeight: '600'},
        }}
        backgroundColor="rgb(219, 46, 127)"
      />
    ),
  };
};

export default SigninScreen;
