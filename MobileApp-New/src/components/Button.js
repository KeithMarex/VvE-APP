import React from 'react'
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'
import {ArrowIcon, Logo} from '../resources'
import StyledText from "./StyledText";

const window = Dimensions.get('window')

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.pressAction}>
            <StyledText inputStyle={styles.buttonText}>
                { props.children }
            </StyledText>
            {props.withArrow && (
                <ArrowIcon width={14} height={14} stroke={'#A0CAE8'} marginLeft={4} />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderColor: '#A0CAE8',
        borderWidth: 2,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        flexDirection: 'row'
    },
    buttonText: {
        color: '#A0CAE8',
        fontSize: 14,
        fontWeight: 'bold',
    },
})

export default Button
