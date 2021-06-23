import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import PageLogo from "../../components/PageLogo";
import StyledText from "../../components/StyledText";

const NewsDetail = (props) => {
    return (
        <View>
            <SafeAreaView style={styles.root}>
                <ScrollView>
                    <View style={styles.news}>
                        <PageLogo/>
                        <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>TESTSTST</StyledText>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

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

export default NewsDetail;
