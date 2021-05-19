import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions} from 'react-native'
import React, {} from 'react'
import StyledText from '../../components/StyledText'
import { Logo } from '../../resources'

const window = Dimensions.get('window')

const TicketDetails = (props) => {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.ticketDetails}>
                    <Logo style={styles.logo} width={window.width / 10 * 5} />
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>Titel van melding</StyledText>

                    <View>

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
    ticketDetails: {
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
    }
})

export default TicketDetails
