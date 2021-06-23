import { StyleSheet, View, Image } from 'react-native'
import StyledText from '../components/StyledText'
import { HomeIcon } from '../resources/index'
import React, {useEffect, useState} from 'react'
import { getOrgColors } from '../util/OrganizationUtil'

const NewsItem = ({newsItem}) => {
    const [colors, setColors] = useState({})

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })
    }, [])

    return (
        <View style={styles.newsItem}>
            <View style={styles.newsThumbnailWrapper}>
                <Image style={styles.newsThumbnail} source={require('../resources/images/news-placeholder.png')} />
            </View>
            <View style={styles.newsTextWrapper}>
                <View style={styles.newsTextTopWrapper}>
                    <View style={styles.newsTextTopOrganization}>
                        <HomeIcon stroke={colors?.secondarycolor} width={8} height={8} />
                    </View>
                    <StyledText inputStyle={styles.newsTextTop}>
                        { newsItem.updatedAt }
                    </StyledText>
                </View>
                <StyledText inputStyle={styles.newsTitle}>
                    { newsItem.title }
                </StyledText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default NewsItem;
