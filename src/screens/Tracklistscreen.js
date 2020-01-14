import React, {useContext, useEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';
import axios from 'axios';
import {Button, Header, Input, Card, Text} from 'react-native-elements';
import TrackLists from './TrackLists';

import MyContext from '../context/AuthContext';
import TrackContext from '../context/TrackContext';



const Tracklistscreen = ({navigation}) => {
  const contextVal = useContext(MyContext);

  const valu = useContext(TrackContext);

  valu.getTracks;

  useEffect(() => {
    console.log('COntext Value :: ', valu);
    console.log('Auth COntext Value :: ', contextVal);
    navigation.setParams({
      headerRightBtn: contextVal

    })
    valu.getTracks();
  }, []);
  let newTracks = valu.getTrackList;
  if (!newTracks) {
    return;
  }

  return (
    <View>
      <Text>Track List Scrren</Text>
      <Button
        title="logout"
        onPress={() => {
          contextVal.signOut();
          navigation.navigate('SignupScreen');
        }}
      />
      <Text h3>{contextVal.authState.email}</Text>
      <Button
        title="Detai Screen"
        onPress={() => navigation.navigate('Trackdetailscreen')}
      />
      <FlatList
        data={newTracks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return <TrackLists item={item} />;
        }}
      />
    </View>
  );
};

Tracklistscreen.navigationOptions = ({navigation}) => {


  return {
    header: ()=><Header
        backgroundColor="rgb(219, 46, 127)"
        rightComponent={{
          text: 'LogOut',
          style: {marginTop: '10%', backgroundColor: 'black'},
          onPress: () => {
            navigation.getParam('headerRightBtn').signOut()
            navigation.navigate('SignupScreen');
          },
        }}
      />
    
  };
};

export default Tracklistscreen;
