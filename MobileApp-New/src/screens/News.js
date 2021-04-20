import { SafeAreaView, ScrollView, View, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import {HomeIcon, Logo} from '../resources'
import StyledText from '../components/StyledText'
import NewsShowcase from '../components/NewsShowcase'

const window = Dimensions.get('window')

const News = () => {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.news}>
                    <Logo style={styles.logo} width={window.width / 10 * 5} />
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>Nieuws</StyledText>

                    <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>Meest recent</StyledText>
                    <NewsShowcase />

                    <View style={styles.newsList}>
                        <View style={styles.newsItem}>
                            <View style={styles.newsThumbnailWrapper}>
                                <Image
                                    style={styles.newsThumbnail}
                                    source={require('../resources/images/news-placeholder.png')}
                                />
                            </View>
                            <View>
                                <View style={styles.newsTextTopWrapper}>
                                    <View style={styles.newsTextTopOrganization}>
                                        <HomeIcon stroke={'#A0CAE8'} width={10} height={10} />
                                        <StyledText inputStyle={styles.newsTextTop}>De Nieuwe Wereld</StyledText>
                                    </View>
                                    <StyledText inputStyle={styles.newsTextTopLine}>|</StyledText>
                                    <StyledText inputStyle={styles.newsTextTop}>25/03/2021</StyledText>
                                </View>
                                <StyledText>Gastoptreden van DJ Billybool</StyledText>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F7F7FC',
        height: '100%',
    },
    news: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 30,
        paddingBottom: 90
    },
    logo: {
        marginBottom: 10
    },
    pageTitle: {
        marginBottom: window.height / 40,
    },

    newsList: {
        width: '100%'
    },
    newsItem: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#f8f8f8',
        borderWidth: 5,
        marginBottom: 8,
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        flexDirection: 'row'
    },
    newsThumbnailWrapper: {
        width: 100,
        height: 60,
        borderRadius: 10,
    },
    newsThumbnail: {
        borderRadius: 5,
        width: '100%',
        height: '100%'
    },

    newsTextTopWrapper: {
        flexDirection: 'row',
    },
    newsTextTop: {
        color: '#6E7191',
        fontSize: 10,
        marginRight: 8,
        marginLeft: 8,
    },
    newsTextTopLine: {
        fontSize: 10,
        color: '#6E7191'
    },
    newsTextTopOrganization: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})

export default News
