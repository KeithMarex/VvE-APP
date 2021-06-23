import React, {useEffect, useState} from 'react'
import { StyleSheet, Text } from 'react-native'
import { getOrgColors } from '../util/OrganizationUtil'

const StyledText = (props) => {
    const [colors, setColors] = useState({})

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })
    }, [])

    const styles = getTextStyle(parseInputStyleArray(props.inputStyle), colors)

    return (
        <Text style={[styles.styledText, styles[props.theme]]}>
            { props.children }
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

const getTextStyle = (inputStyle, colors) => {
    let styledText = {
        fontSize: 14,
        letterSpacing: 1,
        color: colors.primarycolor,
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
            fontSize: 28,
            color: colors.primarycolor,
            fontWeight: 'bold',
            letterSpacing: 1
        },
        sectionHeader: {
            fontSize: 16,
            fontWeight: 'normal',
            color: '#4E4B66',
            letterSpacing: 3,
            textTransform: 'uppercase'
        },
        cardHeader: {
            color: colors.primarycolor,
            fontWeight: 'bold',
            fontSize: 20,
            letterSpacing: 1
        },
        secondaryColor: {
            color: colors.secondarycolor
        }
    })
}

export default StyledText
