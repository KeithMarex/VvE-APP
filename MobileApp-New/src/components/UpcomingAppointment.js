import {Dimensions, StyleSheet, View} from "react-native";
import StyledText from "./StyledText";
import {CalendarIcon} from "../resources";
import React, {useEffect, useState} from "react";
import ApiHelper from "../util/ApiHelper";
import moment from "moment";

const UpcomingAppointment = () => {
    const [upcomingApp, setUpcomingApp] = useState({});
    useEffect(() => {
        // Function to get API Data
        ApiHelper.get('/agenda/next').then(val => {
            setUpcomingApp(val);
        })
    });

    return (
        <View style={styles.upcomingAppointment}>
            <View style={{width: Dimensions.get('window').width * .7,}}>
            <StyledText>Eerst volgende nieuwe afspraak</StyledText>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <CalendarIcon stroke={'#451864'}/>
                <StyledText inputStyle={styles.informatie}>{moment(upcomingApp['date'].split('T', 1), "YYYY-MM-DD").format("DD-MMMM-YYYY")}</StyledText>
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
    }
});

export default UpcomingAppointment;
