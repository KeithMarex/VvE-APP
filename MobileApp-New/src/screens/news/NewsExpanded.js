import {SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import WebView from "react-native-webview";
import React, {useEffect} from 'react';
import StyledText from "../../components/StyledText";
import DOMParser from 'react-native-html-parser';
import HTMLView from "react-native-htmlview";

const NewsExpanded = (props) => {
    const [param, setParam] = React.useState();

    useEffect(() => {
        const inputTicket = props.route.params.currItem;
        setParam(inputTicket);
    })

    return (
        <View>
            <SafeAreaView style={styles.root}>
                <ScrollView>
                    <View style={styles.news}>
                        <StyledText>{param?._title}</StyledText>
                        <HTMLView
                            value={param?._content}
                            stylesheet={styles}
                        />
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
        paddingBottom: 90,
        marginTop: 50,
        backgroundColor: '#fff',
        width: '80%',
        marginLeft: '10%',
        borderRadius: 15
    },
    logo: {
        marginBottom: 10
    },
    pageTitle: {
        marginBottom: window.height / 40,
    }
});

export default NewsExpanded;
