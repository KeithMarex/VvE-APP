import {SafeAreaView, StyleSheet, ScrollView, View, Image, Dimensions} from 'react-native'
import React from 'react'
import StyledText from '../components/StyledText'
import { Logo, CommentIcon } from '../resources'

const window = Dimensions.get('window')

const Tickets = (props) => {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.tickets}>
                    <Logo style={styles.logo} width={window.width / 10 * 5} />

                    <StyledText inputStyle={styles.ticketsTitle} theme={'pageTitle'}>Meldingen</StyledText>

                    <View style={styles.ticketsList}>
                        <View style={styles.ticket}>

                            <View style={styles.ticketHeader}>
                                <StyledText inputStyle={styles.ticketTitle} theme={'cardHeader'}>Titel van melding</StyledText>
                                <View style={styles.ticketCommentCount}>
                                    <StyledText inputStyle={styles.ticketCommentCountAmount}>0</StyledText>
                                    <CommentIcon width={18} height={18} stroke={'#4E4B66'} />
                                </View>
                            </View>

                            <StyledText inputStyle={styles.ticketDescription}>
                                Dit is een kleine beschrijving van de melding die is gedaan.
                            </StyledText>

                            <StyledText inputStyle={styles.ticketStatus}>Status: In behandeling</StyledText>

                            <View style={styles.ticketBottom}>
                                <View style={styles.lastUpdate}>
                                    <StyledText inputStyle={styles.lastUpdateText}>Laatste wijziging:</StyledText>
                                    <StyledText inputStyle={styles.lastUpdateText}>13 mei 2021 15:30</StyledText>
                                </View>

                                <View>

                                </View>
                            </View>

                        </View>
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
    tickets: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 30,
        paddingBottom: 90
    },
    logo: {
        marginBottom: 10
    },
    ticketsTitle: {
      marginBottom: 20
    },

    ticketsList: {

    },
    ticket: {
        width: '100%',
        backgroundColor: '#FCFCFC',
        borderRadius: 20,
        borderColor: '#f8f8f8',
        borderWidth: 5,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 30,
        paddingLeft: 30,
    },
    ticketHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    ticketTitle: {

    },
    ticketCommentCount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ticketCommentCountAmount: {
        color: '#4E4B66',
        fontSize: 16,
        marginRight: 5
    },
    ticketDescription: {
        color: '#6E7191',
        fontSize: 13,
        textAlign: 'left',
        marginBottom: 10,
    },
    ticketStatus: {
        textAlign: 'left',
        color: '#14142B',
        marginBottom: 10
    },
    lastUpdateText: {
        textAlign: 'left',
        fontSize: 10,
        color: '#6E7191',
        letterSpacing: 0.5,
        marginBottom: 3
    },
    ticketBottom: {

    }

})

export default Tickets;
