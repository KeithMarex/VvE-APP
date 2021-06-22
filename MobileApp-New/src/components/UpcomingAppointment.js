import {Dimensions, StyleSheet, View} from "react-native";
import StyledText from "./StyledText";
import {CalendarIcon} from "../resources";
import React, {useEffect, useState} from "react";
import ApiHelper from "../util/ApiHelper";
import moment from "moment";
import tra from "../config/languages/translate";
import { getOrgColors } from '../util/OrganizationUtil';

const UpcomingAppointment = () => {
    const [upcomingApp, setUpcomingApp] = useState('');
    const [colors, setColors] = useState({})
    const [tr, setTr] = useState({})

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })

        tra().then(res => {
            setTr(res)
        })
    }, [])

    useEffect(() => {
        // Function to get API Data
        ApiHelper.get('/agenda/next').then(val => {
            const date = moment(val['data']['date'].split('T', 1), "YYYY-MM-DD").format("DD-MMMM-YYYY").split('-');
            const time = val['data']['date'].split('T', 2)[1].split('.', 1)[0].split(':');
            setUpcomingApp(`${date[0]} ${date[1]} ${date[2]} om ${time[0]}:${time[1]}`);
        })
    });

    return (
        <View style={styles.upcomingAppointment}>
            <View style={{width: Dimensions.get('window').width * .7,}}>
            <StyledText>{tr.agenda?.upcomingAppointment}</StyledText>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <CalendarIcon stroke={colors?.primarycolor}/>
                <StyledText inputStyle={styles.information}>{upcomingApp}</StyledText>
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

});

export default UpcomingAppointment;
