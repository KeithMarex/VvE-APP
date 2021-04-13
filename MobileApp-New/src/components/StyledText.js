import React from 'react'
import {StyleSheet, Text, View} from 'react-native'


const StyledText = (props) => {
    return (
        <Text style={styles.styledText}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    styledText: {
        fontSize: 16,
        letterSpacing: 1,
        color: '#451864'
    }
})

export default StyledText
