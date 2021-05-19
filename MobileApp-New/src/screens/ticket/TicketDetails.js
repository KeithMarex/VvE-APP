import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions} from 'react-native'
import React, {useState} from 'react'
import StyledText from '../../components/StyledText'
import { Logo } from '../../resources'
import PageLogo from '../../components/PageLogo'

const window = Dimensions.get('window')

const TicketDetails = (props) => {
    const [ticket, setTicket] = useState(props.route.params.ticket)

    console.log(ticket)

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.ticketDetails}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>
                        { ticket.title }
                    </StyledText>

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
        marginBottom: window.height / 40,
    }
})

export default TicketDetails
