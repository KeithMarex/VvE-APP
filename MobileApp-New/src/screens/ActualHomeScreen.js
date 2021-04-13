import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import StyledText from '../components/StyledText'
import {Svg, Defs, LinearGradient, Stop, Rect, Ellipse} from 'react-native-svg'

const window = Dimensions.get('window')

const HomeScreen = (props) => {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.home}>
                    <Image style={styles.logo} source={require('../resources/images/de-nieuwe-wereld-logo.png')} resizeMode="contain" />

                    <View style={[styles.homeSection, styles.intro]}>
                        <StyledText inputStyle={styles.introWelcome}>Welkom</StyledText>
                        <StyledText inputStyle={styles.introName}>Hicham Ben Yessef</StyledText>
                        <View style={styles.introMessage}>
                            <StyledText inputStyle={[styles.introMessageText, styles.introMessageTextComments]}>1 nieuwe reactie ></StyledText>
                        </View>
                        <View style={styles.introMessage}>
                            <StyledText inputStyle={[styles.introMessageText, styles.introMessageTextAgenda]}>3 nabije agendapunten ></StyledText>
                        </View>
                    </View>

                    <View style={styles.homeSectionWrapper}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>Binnenkort</StyledText>
                        <View style={[styles.homeSection, styles.agenda]}>
                            <StyledText inputStyle={styles.agendaItemName}>Maandelijkse vergadering</StyledText>
                            <View>
                                <StyledText inputStyle={styles.agendaItemDate}>Za. 11 maart 16:00 - 17:30</StyledText>
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
                                            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                                            <Stop offset="100%" stopColor="#5C3974" stopOpacity="0.9" />
                                        </LinearGradient>
                                    </Defs>
                                    <Rect x="0" y="0" width="100%" height="100%" rx='10' fill="url(#grad)" />
                                </Svg>
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
        padding: 30
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
        marginTop: 10
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
        color: '#A0CAE8',
        fontSize: 14,
    },

    news: {
        position: 'relative',
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
    }

});

export default HomeScreen;
