import React from 'react'
import {View, Text} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Map from '../components/map'


const Trackcreatescreen = () => {
    return (
        <SafeAreaProvider>
            <Text>Track Creation</Text>
            <Map />

            
        </SafeAreaProvider>
            
    )
}

export default Trackcreatescreen
