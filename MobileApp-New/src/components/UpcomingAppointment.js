import {Dimensions, StyleSheet, View} from "react-native";
import StyledText from "./StyledText";
import {CalendarIcon} from "../resources";
import React from "react";

const UpcomingAppointment = () => {
    return (
        <View style={styles.upcomingAppointment}>
            <View style={{width: Dimensions.get('window').width * .7,}}>
            <StyledText>Eerst volgende nieuwe afspraak</StyledText>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <CalendarIcon stroke={'#451864'}/>
                <StyledText inputStyle={styles.informatie}>Zaterdag 19 Juni 16:00 - 17:30</StyledText>
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
