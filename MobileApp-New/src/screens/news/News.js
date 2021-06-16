import { SafeAreaView, ScrollView, View, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import {HomeIcon, Logo} from '../../resources'
import StyledText from '../../components/StyledText'
import NewsShowcase from '../../components/NewsShowcase'
import PageLogo from "../../components/PageLogo";
import tr from '../../config/languages/translate';

const window = Dimensions.get('window')

const News = () => {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.news}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>{tr.news.news}</StyledText>

                    <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>{tr.news.mRecent}</StyledText>
                    <NewsShowcase />

                    <View style={styles.newsList}>

                        <View style={styles.newsItem}>
                            <View style={styles.newsThumbnailWrapper}>
                                <Image
                                    style={styles.newsThumbnail}
                                    source={require('../../resources/images/news-placeholder.png')}
                                />
                            </View>
                            <View style={styles.newsTextWrapper}>
                                <View style={styles.newsTextTopWrapper}>
                                    <View style={styles.newsTextTopOrganization}>
                                        <HomeIcon stroke={'#A0CAE8'} width={8} height={8} />
                                        <StyledText inputStyle={styles.newsTextTop}>De Nieuwe Wereld</StyledText>
                                    </View>
                                    <StyledText inputStyle={styles.newsTextTopLine}>|</StyledText>
                                    <StyledText inputStyle={styles.newsTextTop}>25/03/2021</StyledText>
                                </View>
                                <StyledText inputStyle={styles.newsTitle}>Dit is een nieuwsartikel</StyledText>
                            </View>
                        </View>

                        <View style={styles.newsItem}>
                            <View style={styles.newsThumbnailWrapper}>
                                <Image
                                    style={styles.newsThumbnail}
                                    source={require('../../resources/images/news-placeholder.png')}
                                />
                            </View>
                            <View style={styles.newsTextWrapper}>
                                <View style={styles.newsTextTopWrapper}>
                                    <View style={styles.newsTextTopOrganization}>
                                        <HomeIcon stroke={'#A0CAE8'} width={8} height={8} />
                                        <StyledText inputStyle={styles.newsTextTop}>De Nieuwe Wereld</StyledText>
                                    </View>
                                    <StyledText inputStyle={styles.newsTextTopLine}>|</StyledText>
                                    <StyledText inputStyle={styles.newsTextTop}>25/03/2021</StyledText>
                                </View>
                                <StyledText inputStyle={styles.newsTitle}>Dit is nog een interessant nieuwsartikel</StyledText>
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
    sectionHeader: {
      marginBottom: '2%'
    },

    newsList: {
        width: '100%'
    },
    newsItem: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#f8f8f8',
        borderWidth: 5,
        paddingVertical: '3%',
        paddingHorizontal: '3%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    newsThumbnailWrapper: {
        width: 100,
        height: 60,
        borderRadius: 10
    },
    newsThumbnail: {
        borderRadius: 5,
        width: '100%',
        height: '100%'
    },

    newsTextWrapper: {
        marginLeft: '3%',
        flex: 1
    },
    newsTextTopWrapper: {
        flexDirection: 'row',
    },
    newsTextTop: {
        color: '#6E7191',
        fontSize: 8,
        marginHorizontal: 6
    },
    newsTextTopLine: {
        fontSize: 8,
        color: '#6E7191'
    },
    newsTextTopOrganization: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    newsTitle: {
        marginTop: 2,
        textAlign: 'left',
        fontSize: 14,
        color: '#4E4B66'
    }
})

export default News
