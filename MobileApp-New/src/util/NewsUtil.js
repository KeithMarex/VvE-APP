import { AsyncStorage } from 'react-native'
import ApiHelper from './ApiHelper'
import sortBy from "sort-by";
import NewsModel from "../models/news.model";
import {parseDateWithTime} from "./DateUtil";

let news

export const initNews = async () => {
    await fetchNews()
}

export const getNews = async () => {
    if (!news) {
        await fetchNews()
    }
    return news
}

const fetchNews = async () => {
    await ApiHelper.get('/news')
        .then((res) => {
            const parsedNews = []
            const sortedNews = res.data.sort(sortBy('-updatedAt'))

            sortedNews.forEach((newsItem) => {
                parsedNews.push(
                    new NewsModel(
                        newsItem._id,
                        newsItem.author,
                        newsItem.title,
                        newsItem.content,
                        parseDateWithTime(newsItem.createdAt),
                        parseDateWithTime(newsItem.createdAt)
                    ))
            })

            news = parsedNews
        })
}
