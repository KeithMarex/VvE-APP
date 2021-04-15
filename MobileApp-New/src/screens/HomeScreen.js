import React from 'react'
import { StyleSheet, View, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import StyledText from '../components/StyledText'
import {Svg, Defs, LinearGradient, Stop, Rect} from 'react-native-svg'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'

import { CommentIcon, CalendarIcon, HomeIcon, Logo } from '../resources'

const window = Dimensions.get('window');
const Tab = createBottomTabNavigator();

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
                        <View style={[styles.homeSection, styles.news]}>
                            <Image style={styles.newsImage} source={require('../resources/images/news-placeholder.png')}/>
                            <View style={styles.newsImageOverlay}>
                                <Svg height="100%" width="100%">
                                    <Defs>
                                        <LinearGradient id="grad" x1="1" y1="0" x2="1" y2="1">
                                            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                                            <Stop offset="100%" stopColor="#5C3974" stopOpacity="0.9" />
                                        </LinearGradient>
                                    </Defs>
                                    <Rect x="0" y="0" width="100%" height="100%" rx='10' fill="url(#grad)" />
                                </Svg>
                            </View>
                            <View style={styles.newsTextWrapper}>
                                <View style={styles.newsTextTopWrapper}>
                                    <View style={styles.newsTextTopOrganization}>
                                        <HomeIcon stroke={'#A0CAE8'} width={10} height={10} />
                                        <StyledText inputStyle={styles.newsTextTop}>De Nieuwe Wereld</StyledText>
                                    </View>
                                    <StyledText inputStyle={styles.newsTextTopLine}>|</StyledText>
                                    <StyledText inputStyle={styles.newsTextTop}>25/03/2021</StyledText>
                                </View>
                                <StyledText inputStyle={styles.newsTitle}>Nieuw lid bij de WhatsApp buurtpreventie</StyledText>
                            </View>
                        </View>
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
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
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
        width: window.width / 10 * 5,
        height: window.height / 6,
        marginBottom: 10
    },
    homeSection: {
        width: '100%',
        backgroundColor: '#FCFCFC',
        borderRadius: 20,
        borderColor: '#f8f8f8',
        borderWidth: 5
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

    news: {
        position: 'relative',
        justifyContent: 'flex-end',
    },
    newsImage: {
        width: '100%',
        height: 225,
        borderRadius: 10,
    },
    newsImageOverlay: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        width: '100%',
        height: 225,
        borderRadius: 20
    },
    newsTextWrapper: {
        position: 'absolute',
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
    newsTitle: {
        color: '#FCFCFC',
        fontSize: 18
    },
    newsTextTopWrapper: {
        flexDirection: 'row',
    },
    newsTextTop: {
        color: '#FCFCFC',
        fontSize: 10,
        marginRight: 8,
        marginLeft: 8,
    },
    newsTextTopLine: {
        fontSize: 10,
        color: '#A0CAE8'
    },
    newsTextTopOrganization: {
        flexDirection: 'row',
        alignItems: 'center'
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
});

export default HomeScreen;
