import React from 'react'
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import CloseButtonComponent from './Buttons/CloseButton.Component'

const InputImage = (props) => {
    console.log(props)
    return (
        <TouchableOpacity onPress={() => props.removeImage(props.image)}>
            <Image style={{width: 100, height: 100, borderRadius: 15, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5}}
                   source={{uri: `data:image/png;base64,${props.image['base64']}`}}
            />
            <CloseButtonComponent style={styles.circle}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    circle: {
        position: 'absolute',
        right: 1,
        top: 1,
        marginTop: -5,
        marginRight: -5
    },
})

export default InputImage
