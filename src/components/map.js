import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import RNLocation from 'react-native-location';

import flagBlueImg from '../../assets/flag-blue.png';
import flagPinkImg from '../../assets/flag-pink.png';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const Map = () => {
  const [location, setLocation] = useState({
    latitude: 37.7883,
    longitude: -122.4323,
  });
  const [markerList, setMarkerList] = useState([]);
  let coordArr = [];
  

  function _startUpdatingLocation(location1) {
    setLocation({latitude:location1.latitude, longitude:location1.longitude})
 
    //console.log('location1 in FUNC :', location1);
    setMarkerList( [...markerList, {latitude:location.latitude, longitude:location.longitude}])


    
    //console.log(markerList)

  }

  useEffect(() => {
    console.log('RN LOCATION');
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        locationSubscription = RNLocation.subscribeToLocationUpdates(
          locations => {
            // console.log(locations);

          


            _startUpdatingLocation(locations[0]);
            /* Example location returned
                  {
                    speed: -1,
                    longitude: -0.1337,
                    latitude: 51.50998,
                    accuracy: 5,
                    heading: -1,
                    altitude: 0,
                    altitudeAccuracy: -1
                    floor: 0
                    timestamp: 1446007304457.029,
                    fromMockProvider: false
                  }
                  */
          },
        );
      }
    });
    console.log('Marker list', markerList);
  }, [markerList]);
  return (
    <MapView
      style={MapStyles.map}
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      //   region={{
      //     latitude: 42.882004,
      //     longitude: 74.582748,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   }}
      //showsUserLocation={true}
    >
      <Marker
        //  onPress={() => this.setState({ marker2: !this.state.marker2 })}
        coordinate={{
          latitude: LATITUDE + SPACE,
          longitude: LONGITUDE - SPACE,
        }}
        centerOffset={{x: -42, y: -60}}
        anchor={{x: 0.84, y: 1}}
        opacity={0.6}
        //image={this.state.marker2 ? flagBlueImg : flagPinkImg}
      />
      <Marker
        // onPress={() => this.setState({ marker2: !this.state.marker2 })}
        coordinate={{
          latitude: LATITUDE - SPACE,
          longitude: LONGITUDE - SPACE,
        }}
        centerOffset={{x: -42, y: -60}}
        anchor={{x: 0.84, y: 1}}
        //image={this.state.marker2 ? flagBlueImg : flagPinkImg}
      />
      <Marker
        //  onPress={() => this.setState({ marker2: !this.state.marker2 })}
        coordinate={{
          latitude: LATITUDE + SPACE,
          longitude: LONGITUDE + SPACE,
        }}
        centerOffset={{x: -42, y: -60}}
        anchor={{x: 0.84, y: 1}}
        opacity={0.6}
        //image={this.state.marker2 ? flagBlueImg : flagPinkImg}
      />
      {markerList.forEach((mark)=>{
        <Marker
        //  onPress={() => this.setState({ marker2: !this.state.marker2 })}
        coordinate={{
          latitude: mark.latitude,
          longitude: mark.longitude,
        }}
        centerOffset={{x: -42, y: -60}}
        anchor={{x: 0.84, y: 1}}
        opacity={0.6}
        //image={this.state.marker2 ? flagBlueImg : flagPinkImg}
      />

      })}
      <Polyline 
        coordinates={markerList}
        strokeColor="black"
        strokeWidth={5}
      />
   
   
       
            
        
        
    
    </MapView>
  );
};

const MapStyles = StyleSheet.create({
  // container: {
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     right: 0,
  //     bottom: 0,
  //     justifyContent: 'flex-end',
  //     alignItems: 'center',
  //   },
  map: {
    position: 'absolute',
    height: 600,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Map;
