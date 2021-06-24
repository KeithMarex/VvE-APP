import React, {useEffect, useState} from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import StyledText from "./StyledText";
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg'
import { getOrgColors } from '../util/OrganizationUtil'
import {CalendarIcon} from "../resources"
import { getNews } from '../util/NewsUtil'

const window = Dimensions.get('window')

const NewsShowcase = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [colors, setColors] = useState({})

    useEffect(() => {
        getNews().then((news) => {
            setNewsArticles(news)
        })

        getOrgColors().then(colors => {
            setColors(colors)
        })
    }, [])

    return (
        <View style={styles.newsShowcase}>
            { newsArticles && (
                <View style={styles.newsShowcase}>
                    <Image style={styles.newsImage} source={require('../resources/images/news-placeholder.png')}/>
                    <View style={styles.newsImageOverlay}>
                        <Svg height="100%" width="100%">
                            <Defs>
                                <LinearGradient id="grad" x1="1" y1="0" x2="1" y2="1">
                                    <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                                    <Stop offset="100%" stopColor={colors?.primarycolor} stopOpacity="0.9" />
                                </LinearGradient>
                            </Defs>
                            <Rect x="0" y="0" width="100%" height="100%" rx='10' fill="url(#grad)" />
                        </Svg>
                    </View>
                    <View style={styles.newsTextWrapper}>
                        <View style={styles.newsTextTopWrapper}>
                            <View style={styles.newsTextTopOrganization}>
                                <CalendarIcon stroke={colors?.secondarycolor} width={10} height={10} />
                            </View>
                            <StyledText inputStyle={styles.newsTextTop}>
                                {newsArticles[0]?._updatedAt}
                            </StyledText>
                        </View>
                        <StyledText inputStyle={styles.newsTitle}>
                            {newsArticles[0]?._title}
                        </StyledText>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    newsShowcase: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#f8f8f8',
        borderWidth: 5,
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
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: 10,
        paddingBottom: 25,
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
        opacity: .8
    },
    newsTextTopLine: {
        fontSize: 10,
    },
    newsTextTopOrganization: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})

export default NewsShowcase
