import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { parseDateWithTime } from '../util/DateUtil'

const AppointmentChoose = (props) => {
    const getText = () => {
        return parseDateWithTime(props.currApp.date)
    }

    const sendData = () => {
        props.pressAction(props.currApp)
    }

    return (
        <TouchableOpacity style={styles.view} onPress={sendData}>
            <Text>
                {getText()}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#F7F7FC',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        marginBottom: 10
    },
})

export default AppointmentChoose

