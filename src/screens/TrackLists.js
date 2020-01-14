import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import {Button, Text, Card} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const TrackLists = (props) => {
    return (
        <SafeAreaProvider>
            <TouchableOpacity 
                onPress={()=>{
                    console.log(`${props.item.id}`)
                }}><Card title={String(props.item.id)}>
            <Text>Email: {props.item.email}</Text>
            <Text>User ID: {props.item.user_id}</Text></Card>
            </TouchableOpacity>

            
        </SafeAreaProvider>
    )
}

export default TrackLists
