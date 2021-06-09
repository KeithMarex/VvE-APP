import {SafeAreaView, StyleSheet, ScrollView, Dimensions} from 'react-native'
import React from 'react'

const window = Dimensions.get('window')

const TicketImages = (props) => {

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView} horizontal={true}>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F7F7FC',
        height: '100%',
    }
})

export default TicketImages
