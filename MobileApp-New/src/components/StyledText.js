import React from 'react'
import { StyleSheet, Text } from 'react-native'


const StyledText = (props) => {
    const styles = getTextStyle(props.inputStyle)
    return (
        <Text style={[styles.styledText, styles[props.theme]]}>
            {props.children}
        </Text>
    )
}

const getTextStyle = (inputStyle) => {
    return StyleSheet.create({
        styledText: {
            fontSize: inputStyle.fontSize ? inputStyle.fontSize : 14,
            letterSpacing: inputStyle.letterSpacing ? inputStyle.letterSpacing : 1,
            color: inputStyle.color ? inputStyle.color : '#451864',
            fontWeight: inputStyle.fontWeight ? inputStyle.fontWeight : 'normal',
            textAlign: inputStyle.textAlign ? inputStyle.textAlign : 'center',
            textTransform: inputStyle.textTransform ? inputStyle.textTransform : 'none'
        },

        // THEMES
        pageTitle: {
            fontSize: 24,
            color: '#451864',
            fontWeight: 'bold',
            letterSpacing: 1
        },
        sectionHeader: {
            fontSize: 16,
            fontWeight: 'normal',
            color: '#4E4B66',
            letterSpacing: 3,
            textTransform: 'uppercase'
        }
    })
}

export default StyledText
