import {SafeAreaView, ScrollView, View, StyleSheet, Dimensions} from "react-native";
import React from "react";
import {CalendarIcon} from "../../resources";
import {Calendar} from 'react-native-calendars';
import StyledText from "../../components/StyledText";
import PageLogo from "../../components/PageLogo";

const CalendarScreen = () => {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.home}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.header} theme={'pageTitle'}>Agenda</StyledText>
                    <View style={styles.upcomingAppointment}>
                        <View style={{width: Dimensions.get('window').width * .7,}}>
                            <StyledText>Eerst volgende nieuwe afspraak</StyledText>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                                <CalendarIcon stroke={'#451864'}/>
                                <StyledText inputStyle={styles.informatie}>Zaterdag 19 Juni 16:00 - 17:30</StyledText>
                            </View>
                        </View>
                    </View>
                    <View style={styles.calendarView}>
                        <Calendar style={{width: Dimensions.get('window').width * .7}} theme={{arrowColor: '#451864'}}
                              markedDates={{
                                  '2021-06-19': {marked: true, dotColor: '#451864'},
                              }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    informatie: {
        flex: 1,
        color: '#6E7191',
        fontSize: 13,
        marginBottom: 10,
        justifyContent: 'flex-end',
    },
    upcomingAppointment: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingBottom: 10,
        marginBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        marginBottom: Dimensions.get('window').height / 40,
    },
    calendarView: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 20,
        paddingRight: 20
    },
    root: {
        backgroundColor: '#F7F7FC',
        height: '100%',
    },
    home: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 30,
        paddingBottom: 90
    },
    logo: {
        marginBottom: 10
    },
})

export default CalendarScreen;
