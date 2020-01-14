import React from 'react'
import {View, Text} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';


import Map from '../components/map'

const Trackdetailscreen = () => {
    return (
        <SafeAreaProvider>
            <Map />
            <Text>Track Detail</Text>
            
        </SafeAreaProvider>
            
    )
}

export default Trackdetailscreen
