import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {CloseButton} from '../../resources'
import StyledText from '../StyledText'

const window = Dimensions.get('window')

const CloseButtonComponent = (props) => {
    return (
        <View style={{...styles.addButton, ...props.style}}>
            <View style={styles.addButtonIconWrapper}>
                <CloseButton stroke={'#FFF'} width={window.width / 10 * .5} height={window.width / 10 * .5}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        marginVertical: 15,
    },
    addButtonIconWrapper: {
        backgroundColor: '#A0CAE8',
        borderRadius: 50,
        width: window.width / 10 * .7,
        height: window.width / 10 * .7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        marginTop: 4,
        fontSize: 11,
        color: 'black'
    },
})

export default CloseButtonComponent
