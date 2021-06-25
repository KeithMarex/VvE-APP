import {SafeAreaView, ScrollView, View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Calendar} from 'react-native-calendars'
import StyledText from "../../components/StyledText"
import PageLogo from '../../components/PageLogo'
import DateDetailModalComponent from '../../components/DateDetailModalComponent'
import ApiHelper from '../../util/ApiHelper'
import moment from 'moment'
import UpcomingAppointment from '../../components/UpcomingAppointment'
import DateChooseModalComponent from '../../components/DateChooseModalComponent'
import { getOrgColors } from '../../util/OrganizationUtil'

const CalendarScreen = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalDetailVisible, setModalDetailVisible] = useState(false)
    const [modalInfo, setModalInfo] = useState()
    const [calendarData, setCalendarData] = useState({})
    const [rawData, setRawData] = useState({})
    const [currAppData, setCurrAppData] = useState()
    const [colors, setColors] = useState({})

    useEffect(() => {
        const nowDateObj = {'year': moment().year(), 'month': moment().month() + 1}

        getOrgColors().then(colors => {
            setColors(colors)

            fetchCalendarItems(nowDateObj)
        })
    }, [])

    const fetchCalendarItems = (dateObj) => {
        const date = (dateObj['year']+'-'+dateObj['month'])

        ApiHelper.get(`/agenda/${date}`).then(res => {
            const dates = {}
            setRawData(res.data)
            if (res.data.length !== 0 ){
                res.data.forEach(dataItem => {
                    const dateVal = getDateString(dataItem.date)
                    dates[dateVal] = {marked: true, id: dataItem._id}
                })
            }
            setCalendarData(dates)
        })
    }

    const getDateString = (date) => {
        return moment(date).format('YYYY-MM-DD')
    }

    const closeModal = () => {
        setModalVisible(false)
        setModalDetailVisible(false)
    }

    const openDetailModal = (data) => {
        setCurrAppData(data)
        setModalDetailVisible(false)
        setModalInfo(data)
        setModalVisible(true)
    }

    const onDayPress = (day) => {
        if (!day.dateString in calendarData) {
            return
        }

        let count = 0
        rawData.forEach(res => {
            if (getDateString(res.date) === day.dateString) {
                count++
            }
        })

        if (count <= 1){
            let todayObject = []
            rawData.forEach(res => {
                if (getDateString(res.date) === day.dateString) {
                    todayObject.push(res)
                }
            })
            setModalInfo(todayObject[0])
            setModalVisible(true)

            return
        }

        let todayObject = []
        rawData.forEach(res => {
            if (getDateString(res.date) === day.dateString) {
                todayObject.push(res)
            }
        })

        setModalInfo(todayObject)
        setModalDetailVisible(true)
    }

    return colors.primarycolor ? (
        <SafeAreaView style={styles.root}>
            <DateDetailModalComponent visible={modalVisible} onClose={closeModal} modalInfo={modalInfo}/>
            <DateChooseModalComponent visible={modalDetailVisible} onClose={closeModal} modalInfo={modalInfo} openDetailModal={openDetailModal}/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.home}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.header} theme={'pageTitle'}>Agenda</StyledText>
                    <UpcomingAppointment/>
                    <View style={styles.calendarView}>
                        <Calendar style={{width: Dimensions.get('window').width * .7}}
                                  theme={{
                                      arrowColor: colors.primarycolor,
                                      todayTextColor: colors.primarycolor,
                                      dotColor: colors.primarycolor
                                  }}
                                  markingType={'custom'}
                                  markedDates={calendarData}
                                  onDayPress={(day) => { onDayPress(day) }}
                                  loadItemsForMonth={() => { fetchCalendarItems({'year': moment().year(), 'month': moment().month() + 1}) }}
                                  onMonthChange={(month) => { fetchCalendarItems(month) }}
                                  enableSwipeMonths={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    ) : <ActivityIndicator style={styles.loadingSpinner} size={'large'} color={'black'}/>
}

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
    loadingSpinner: {
        marginTop: '15%'
    },
})

export default CalendarScreen
