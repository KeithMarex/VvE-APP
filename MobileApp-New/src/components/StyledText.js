import React from 'react'
import { StyleSheet, Text } from 'react-native'


const StyledText = (props) => {
    const styles = getTextStyle(parseInputStyleArray(props.inputStyle))
    return (
        <Text style={[styles.styledText, styles[props.theme]]}>
            {props.children}
        </Text>
    )
}

const parseInputStyleArray = (inputStyle) => {
    let result = {}
    if (Array.isArray(inputStyle)) {
        inputStyle.forEach((inputStyleItem) => {
            Object.keys(inputStyleItem).forEach((inputStyleItemField) => {
                result = {...result, [inputStyleItemField]: inputStyleItem[inputStyleItemField]}
            })
            result = {...result, }
        })
        return result
    } else {
        return inputStyle
    }
}

const getTextStyle = (inputStyle) => {
    let styledText = {
        fontSize: 14,
        letterSpacing: 1,
        color: '#451864',
        textAlign: 'center'
    }

    if (inputStyle && Object.keys(inputStyle).length > 0) {
        Object.keys(inputStyle).forEach((inputStyleField) => {
            styledText = {...styledText, [inputStyleField]: inputStyle[inputStyleField]}
        })
    }

    return StyleSheet.create({
        styledText: styledText,

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
