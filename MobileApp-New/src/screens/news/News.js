import { SafeAreaView, ScrollView, View, StyleSheet, Dimensions, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import sortBy from 'sort-by'
import tra from '../../config/languages/translate'
import { getOrgColors } from '../../util/OrganizationUtil'
import StyledText from '../../components/StyledText'
import NewsShowcase from '../../components/NewsShowcase'
import PageLogo from '../../components/PageLogo'
import ApiHelper from '../../util/ApiHelper'
import NewsModel from '../../models/news.model'
import NewsItem from '../../components/NewsItem.component'
import { parseDateWithTime } from '../../util/DateUtil'

const window = Dimensions.get('window')

const News = (props) => {
    const [tr, setTr] = React.useState({})
    const [isFetchingNews, setIsFetchingNews] = React.useState(true)
    const [newsArticles, setNewsArticles] = React.useState([])
    const [colors, setColors] = useState({})

    useEffect(() => {
        fetchNews()

        getOrgColors().then(colors => {
            setColors(colors)
        })

        tra().then(res => {
            setTr(res)
        })
    }, [])

    const fetchNews = () => {
        ApiHelper.get('/news')
            .then((res) => {
                const parsedNews = []

                const sortedNews = res.data.sort(sortBy('-updatedAt'))

                sortedNews.forEach((newsItem) => {
                    parsedNews.push(
                        new NewsModel(
                            newsItem._id, newsItem.author, newsItem.title, newsItem.content,
                            parseDateWithTime(newsItem.createdAt), parseDateWithTime(newsItem.createdAt)
                        ))
                })
                setNewsArticles(parsedNews)
                setIsFetchingNews(false)
            })
    }

    const createTicketsReplacement = () => {
        if (newsArticles.length <= 0) {
            return isFetchingNews
                ? <ActivityIndicator style={styles.loadingSpinner} size={'large'} color={colors?.primarycolor}/>
                : <StyledText inputStyle={styles.noTickets}>
                    {tr.ticket?.noNotifications}
                </StyledText>
        }
    }

    const createNewsArticles = () => {
        const newsList = []

        for (let i = 1; i < newsArticles.length; i++) {
            const currItem = newsArticles[i];
            newsList.push(<TouchableOpacity key={i} onPress={() => {props.navigation.navigate('detail', {currItem})}}><NewsItem newsItem={currItem}/></TouchableOpacity>)
        }

        return newsList
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.news}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>{tr.news?.news}</StyledText>

                    <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>{tr.news?.mRecent}</StyledText>

                    {!isFetchingNews
                        ? (<NewsShowcase />)
                        : <Text>Aan het laden...</Text>
                    }

                    <View style={styles.newsList}>
                        {newsArticles.length > 0
                            ? (createNewsArticles())
                            : (createTicketsReplacement())
                        }
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
