import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Spacer = (props) => {
    return (
        <View style={styles(props).Spacer}>
            {props.children}
        </View>
    )
}

const styles = (props)=>StyleSheet.create({
    Spacer:{
        margin:props.space,
        width:props.width,
        justifyContent:props.just,
        alignItems:props.ali,
        padding:props.pad,
        flex:props.flexy,
        backgroundColor:props.backColor,
        borderRadius:props.borderRad,
        borderColor:props.borderCol,
        borderWidth:props.borderWid,
        color:props.color
        
    }

})

export default Spacer



