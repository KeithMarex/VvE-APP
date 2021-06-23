import {SafeAreaView, StyleSheet, ScrollView, Dimensions, Text, Image, ActivityIndicator, ImageBackground} from 'react-native'
import React, {useState} from 'react'
import AutoHeightImage from 'react-native-auto-height-image'

const window = Dimensions.get('window')

const CommentImage = (props) => {
    const { image } = props.route.params

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <AutoHeightImage
                    source={{uri: image}}
                    style={styles.image}
                    width={window.width}/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    image: {
        resizeMode: 'cover',
        justifyContent: 'center',
    },
})

export default CommentImage
