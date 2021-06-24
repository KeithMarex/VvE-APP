import { Dimensions, StyleSheet, View } from 'react-native'
import StyledText from './StyledText'
import { CalendarIcon } from '../resources'
import React, { useEffect, useState } from 'react'
import ApiHelper from '../util/ApiHelper'
import tra from '../config/languages/translate'
import { getOrgColors } from '../util/OrganizationUtil'
import { parseDateWithTime } from '../util/DateUtil'

const UpcomingAppointment = () => {
    const [upcomingApp, setUpcomingApp] = useState('')
    const [colors, setColors] = useState({})
    const [tr, setTr] = useState({})

    useEffect(() => {
        fetchData()

        getOrgColors().then(colors => {
            setColors(colors)
        })

        tra().then(res => {
            setTr(res)
        })
    }, [])

    const fetchData = () => {
        ApiHelper.get('/agenda/next').then(val => {
            setUpcomingApp(parseDateWithTime(val.data.date))
        })
    }

    return (
        <View style={styles.upcomingAppointment}>
            <View style={{width: Dimensions.get('window').width * .7,}}>
            <StyledText>{tr.agenda?.upcomingAppointment}</StyledText>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <CalendarIcon stroke={colors?.primarycolor}/>
                <StyledText inputStyle={styles.information} theme={'secondaryColor'}>{upcomingApp}</StyledText>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    upcomingAppointment: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingBottom: 10,
        marginBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    information: {
        paddingLeft: 10
    }
})

export default UpcomingAppointment
