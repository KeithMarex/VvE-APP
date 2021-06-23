import React, {useEffect} from 'react'
import {Dimensions, Image, StyleSheet, View} from 'react-native'
import {HomeIcon, PenIcon, PlusIcon} from "../resources";
import StyledText from "./StyledText";
import {Defs, LinearGradient, Rect, Stop, Svg} from "react-native-svg";
import ApiHelper from "../util/ApiHelper";
import NewsModel from "../models/news.model";
import { getOrgColors } from '../util/OrganizationUtil'

const window = Dimensions.get('window')

const PageActionButton = () => {
    const [newsArticles, setNewsArticles] = React.useState([]);
    const [colors, setColors] = useState({})

    useEffect(() => {
        fetchNews();
        getOrgColors().then(colors => {
            setColors(colors)
        })
    });

    const fetchNews = () => {
        ApiHelper.get('/news')
            .then((res) => {
                const parsedNews = []
                res.data.forEach((newsItem) => {
                    parsedNews.push(new NewsModel(newsItem._id, newsItem.author, newsItem.title, newsItem.content, newsItem.createdAt.split('T', 1), newsItem.updatedAt.split('T', 1)));
                });
                setNewsArticles(parsedNews);
            })
    }

    return (
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
                    <StyledText inputStyle={styles.newsTextTop}>{newsArticles[0]?._createdAt}</StyledText>
                </View>
                <StyledText inputStyle={styles.newsTitle}>{newsArticles[0]?._title}</StyledText>
            </View>
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
