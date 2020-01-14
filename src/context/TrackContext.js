import React, {useReducer} from 'react';
import {View, Text, Platform} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const TrackContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'TRACKLIST':
        const newState = {...state, trackList: action.payload}
        //console.log('new STATE from reducer :', newState)
        console.log('new State TRACK LIST from reducer :', newState.trackList)
        
      return newState;
    case 'POINTERLIST':
      return state;
    default:
      return state;
  }
};

export const TrackContextProvider = ({children}) => {
  const initialState = {
    trackList: [],
    pointerList: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getTracksFunc = async () => {
    try {
      console.log('get Tracks started !!');
      const email = JSON.parse(await AsyncStorage.getItem('email'));
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      const id = JSON.parse(await AsyncStorage.getItem('id'));
      const test = JSON.parse(await AsyncStorage.getItem('test'));

      if (email !== null && token !== null && id !== null) {
        console.log('EMail ::', email);
        console.log('TOKEn :: ::', token);
        console.log('TEST ASYNC::', test);

        // andriod url =  Platform.OS === 'android' ? `http://192.168.29.143:8080/api/gettracks/${id}/${email}`:
         axios({
            method:'get',
            url: Platform.OS === 'android'
            ? `http://192.168.29.143:8080/api/gettracks`
            : `http://localhost:8080/api/gettracks`,
            params: {
                id: id,
                email: email,
              },
              headers:{
                'Authorization': 'Bearer ' + token }
              

        })
        
          
          .then(data => {
            console.log('From AXISO TRACK LISTS', data.data);

            dispatch({
                type:"TRACKLIST",
                payload:data.data
            })
          })
          .catch(e => console.log(e));

        //    const fetchedTracks = await axios({
        //     method: 'get',
        //     url:`http://localhost:8080/api/gettracks/${id}/${email}`,
        //   });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TrackContext.Provider
      value={{
        getTracks: getTracksFunc,
        getTrackList: state.trackList,
      }}>
      {children}
    </TrackContext.Provider>
  );
};

export default TrackContext;
