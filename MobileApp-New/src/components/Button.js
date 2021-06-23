import React, {useEffect, useState} from 'react'
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'
import {ArrowIcon, Logo} from '../resources'
import StyledText from "./StyledText";
import { getOrgColors } from '../util/OrganizationUtil'

const Button = (props) => {
    const [colors, setColors] = useState({})

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })
    }, [])

    return (
        <TouchableOpacity style={[styles.button, props.style, {borderColor: colors?.secondarycolor}]}
                          onPress={props.pressAction}>
            <StyledText inputStyle={[styles.buttonText, {color: colors?.secondarycolor}]}>
                { props.children }
            </StyledText>
            {props.withArrow && (
                <ArrowIcon width={14} height={14} stroke={colors?.secondarycolor} marginLeft={4} />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})

export default Button
