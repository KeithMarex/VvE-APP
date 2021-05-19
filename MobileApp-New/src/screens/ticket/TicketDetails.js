import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions} from 'react-native'
import React, {useState} from 'react'
import StyledText from '../../components/StyledText'
import PageLogo from '../../components/PageLogo'

const window = Dimensions.get('window')

const TicketDetails = (props) => {
    const [ticket, setTicket] = useState(props.route.params.ticket)

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.ticketDetails}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>
                        { ticket.title }
                    </StyledText>
                    <View style={styles.ticketInfo}>
                        <StyledText inputStyle={styles.ticketInfoDate}>
                            Aangemaakt op: 13 mei 2002 09:05
                        </StyledText>
                        <StyledText inputStyle={styles.ticketInfoDate}>
                            Laatste wijziging: { ticket.lastUpdate }
                        </StyledText>
                        <StyledText inputStyle={styles.ticketInfoStatus}>
                            Status: { ticket.status }
                        </StyledText>
                    </View>

                    <View>
                        <StyledText inputStyle={styles.ticketContent}>
                            { ticket.description }
                        </StyledText>
                    </View>

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
        paddingHorizontal: 30,
        paddingTop: 0,
        paddingBottom: 90
    },
    pageTitle: {
    },
    ticketInfo: {
        marginBottom: window.height / 40,
    },
    ticketInfoDate: {
        fontSize: 10,
        color: '#6E7191',
        letterSpacing: 0.5,
        marginBottom: 3
    },
    ticketInfoStatus: {
        color: '#14142B'
    },
})

export default TicketDetails
