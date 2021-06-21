import React from 'react'
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import CloseButtonComponent from './Buttons/CloseButton.Component'

const InputImage = (props) => {
    return (
        <TouchableOpacity onPress={() => props.removeImage(props.image)} style={styles.inputImageWrapper}>
            <Image style={styles.image}
                   source={{uri: `data:image/png;base64,${props.image['base64']}`}}
            />
            <CloseButtonComponent style={styles.closeBtn}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    inputImageWrapper: {
        position: 'relative',
        width: 100,
        height: 100,
        marginHorizontal: 5,
        marginVertical: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        // marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5
    },
    closeBtn: {
        position: 'absolute',
        right: 1,
        top: 1,
        marginTop: -5,
        marginRight: -5
    },
})

export default InputImage
