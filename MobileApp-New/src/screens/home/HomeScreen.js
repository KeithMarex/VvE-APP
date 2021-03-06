import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import StyledText from '../../components/StyledText'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'

import { CommentIcon, CalendarIcon } from '../../resources'
import NewsShowcase from '../../components/NewsShowcase'
import PageLogo from "../../components/PageLogo";
import UpcomingAppointment from "../../components/UpcomingAppointment";
import tra from '../../config/languages/translate';
import { getOrgColors } from '../../util/OrganizationUtil'
import OrganisationFilesComponent from "../../components/OrganisationFiles.component";

const window = Dimensions.get('window')

const HomeScreen = (props) => {
    const user = props.route.params.user;
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

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.home}>
                    <PageLogo/>

                    <View style={[styles.homeSection, styles.intro]}>
                        <StyledText inputStyle={styles.introWelcome}>{tr.home?.welcome}</StyledText>
                        <StyledText inputStyle={styles.introName}>{user._firstname} {user._lastname}</StyledText>
                    </View>

                    <View style={styles.homeSectionWrapper}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>{tr.home?.soon}</StyledText>
                        <UpcomingAppointment/>
                    </View>

                    <View style={styles.homeSectionWrapper}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>{tr.home?.recentNews}</StyledText>
                        <NewsShowcase />
                    </View>

                    <View style={styles.homeSectionWrapper}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>{tr.home?.vveinfo}</StyledText>
                        <OrganisationFilesComponent/>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    homeSection: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#f8f8f8',
        borderWidth: 5,
    },
    homeSectionWrapper: {
        marginTop: 40,
        width: '100%',
        alignItems: 'center'
    },
    sectionHeader: {
        marginBottom: 10
    },

    intro: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 21,
        paddingBottom: 25,
    },
    introWelcome: {
        fontSize: 13,
        letterSpacing: 3,
        color: '#14142B',
        textTransform: 'uppercase'
    },
    introName: {
        fontWeight: 'bold',
        fontSize: 28
    },
    introMessage: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    introMessageIcon: {
        marginRight: 8
    },
    introMessageText: {
        fontWeight: '300'
    },
    introMessageTextComments: {
        fontSize: 19,
    },
    introMessageTextAgenda: {
        fontSize: 16
    },

    agenda: {
        paddingTop: 15,
        paddingBottom: 18
    },
    agendaItemName: {
        fontSize: 17,
        marginBottom: 10
    },
    agendaItemDate: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    agendaItemDateText: {
        color: '#A0CAE8',
        fontSize: 14,
    },
    agendaItemDateIcon: {
        marginRight: 10
    }
})

export default HomeScreen
