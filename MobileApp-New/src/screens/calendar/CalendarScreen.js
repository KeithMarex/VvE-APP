import {SafeAreaView, ScrollView, View, StyleSheet, Dimensions} from "react-native";
import React, {useEffect, useState} from "react";
import {CalendarIcon} from "../../resources";
import {Calendar} from 'react-native-calendars';
import StyledText from "../../components/StyledText";
import PageLogo from "../../components/PageLogo";
import ModalComponent from "../../components/ModalComponent";
import ApiHelper from "../../util/ApiHelper";
import moment from "moment";
import UpcomingAppointment from "../../components/UpcomingAppointment";

const CalendarScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState();
    const [calendarData, setCalendarData] = useState({});
    const [dataLoad, setDataLoad] = useState(true);

    const getDatumElements = (dateObj) => {
        const date = (dateObj['year']+'-'+dateObj['month']);

        ApiHelper.get(`/agenda/${date}`).then(res => {
            const dates = {};
            if (res['data'].length !== 0 ){
                res['data'].forEach(val => {
                    const dateVal = val['date'].split('T', 1);
                    dates[dateVal] = {marked: true, dotColor: '#451864', id: val['_id']};
                })
            }
            setCalendarData(dates);
        })
    };

    const closeModal = () => {
        setModalVisible(false);
    }

    if(dataLoad){
        const nowDateObj = {'year': moment().year(), 'month': moment().month() + 1};
        getDatumElements(nowDateObj);
        setDataLoad(false);
    }

    return (
        <SafeAreaView style={styles.root}>
            <ModalComponent visible={modalVisible} onClose={closeModal} modalInfo={modalInfo} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.home}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.header} theme={'pageTitle'}>Agenda</StyledText>
                    <UpcomingAppointment/>
                    <View style={styles.calendarView}>
                        <Calendar style={{width: Dimensions.get('window').width * .7}} theme={{arrowColor: '#451864'}}
                              markingType={'custom'}
                              markedDates={calendarData}
                              onDayPress={(day) => {
                                  if (day.dateString in calendarData){
                                      setModalInfo(day)
                                      setModalVisible(true);
                                  }
                              }}
                              loadItemsForMonth={() => {getDatumElements({'year': moment().year(), 'month': moment().month() + 1})}}
                              onMonthChange={(month) => {getDatumElements(month)}}
                              enableSwipeMonths={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000aa',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    informatie: {
        flex: 1,
        color: '#6E7191',
        fontSize: 13,
        marginBottom: 10,
        justifyContent: 'flex-end',
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
