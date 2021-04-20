import React from 'react'
import { StyleSheet, View, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import StyledText from '../components/StyledText'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'

import { CommentIcon, CalendarIcon, Logo } from '../resources'
import NewsShowcase from '../components/NewsShowcase'

const window = Dimensions.get('window')
const Tab = createBottomTabNavigator()

const HomeScreen = (props) => {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.home}>
                    <Logo style={styles.logo} width={window.width / 10 * 5}/>

                    <View style={[styles.homeSection, styles.intro]}>
                        <StyledText inputStyle={styles.introWelcome}>Welkom</StyledText>
                        <StyledText inputStyle={styles.introName}>Hicham Ben Yessef</StyledText>
                        <View style={styles.introMessage}>
                            <CommentIcon style={styles.introMessageIcon} stroke={'#451864'} width={19} height={19} />
                            <StyledText inputStyle={[styles.introMessageText, styles.introMessageTextComments]}>1 nieuwe reactie &#62;</StyledText>
                        </View>
                        <View style={styles.introMessage}>
                            <CalendarIcon style={styles.introMessageIcon} stroke={'#451864'} width={16} height={16} />
                            <StyledText inputStyle={[styles.introMessageText, styles.introMessageTextAgenda]}>3 nabije agendapunten &#62;</StyledText>
                        </View>
                    </View>

                    <View style={styles.homeSectionWrapper}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>Binnenkort</StyledText>
                        <View style={[styles.homeSection, styles.agenda]}>
                            <StyledText inputStyle={styles.agendaItemName}>Maandelijkse vergadering</StyledText>
                            <View style={styles.agendaItemDate}>
                                <CalendarIcon style={styles.agendaItemDateIcon} stroke={'#451864'} width={19} height={19} />
                                <StyledText inputStyle={styles.agendaItemDateText}>Za. 11 maart 16:00 - 17:30</StyledText>
                            </View>
                        </View>
                    </View>

                    <View style={styles.homeSectionWrapper}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>Recent nieuws</StyledText>
                        <NewsShowcase />
                    </View>

                    <View style={styles.homeSectionWrapper}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>VvE informatie</StyledText>
                        <View style={styles.info}>

                            <View style={styles.infoOrganization}>
                                <StyledText inputStyle={styles.infoOrganizationName}>De Nieuwe Wereld</StyledText>
                                <View style={styles.infoOrganizationFiles}>

                                    <View style={styles.infoOrganizationFile}>
                                        <StyledText inputStyle={styles.infoOrganizationFileName}>Huishoudelijk reglement.pdf</StyledText>
                                        <StyledText inputStyle={styles.infoOrganizationFileSize}>(2KB)</StyledText>
                                    </View>

                                    <View style={styles.infoOrganizationFile}>
                                        <StyledText inputStyle={styles.infoOrganizationFileName}>Informatie over het pand.pdf</StyledText>
                                        <StyledText inputStyle={styles.infoOrganizationFileSize}>(10,29KB)</StyledText>
                                    </View>

                                </View>
                            </View>

                            <View style={styles.infoOrganization}>
                                <StyledText inputStyle={styles.infoOrganizationName}>Parkeerplaats</StyledText>
                                <View style={styles.infoOrganizationFiles}>

                                    <View style={styles.infoOrganizationFile}>
                                        <StyledText inputStyle={styles.infoOrganizationFileName}>Parkeren.pdf</StyledText>
                                        <StyledText inputStyle={styles.infoOrganizationFileSize}>(8,13KB)</StyledText>
                                    </View>

                                    <View style={styles.infoOrganizationFile}>
                                        <StyledText inputStyle={styles.infoOrganizationFileName}>Kosten.pdf</StyledText>
                                        <StyledText inputStyle={styles.infoOrganizationFileSize}>(2,29KB)</StyledText>
                                    </View>

                                </View>
                            </View>

                        </View>
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
        width: '100%'
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
    },

    infoOrganization: {
        marginTop: 12
    },
    infoOrganizationName: {
        fontSize: 16
    },
    infoOrganizationFiles: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    infoOrganizationFile: {
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    infoOrganizationFileName: {
        color: '#6E7191',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    infoOrganizationFileSize: {
        marginLeft: 6,
        fontSize: 16,
        color: '#A0CAE8',
    }
})

export default HomeScreen
