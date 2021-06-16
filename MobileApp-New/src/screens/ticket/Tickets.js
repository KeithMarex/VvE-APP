import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import StyledText from '../../components/StyledText'
import PageActionButton from '../../components/PageActionButton'
import TicketsListItem from '../../components/TicketsListItem'
import PageLogo from '../../components/PageLogo'
import ApiHelper from '../../util/ApiHelper'
import { initDateParser, parseDate } from '../../util/DateUtil'
import { parseTicketStatus } from '../../util/ApiParseUtil'
import tr from '../../config/languages/translate';

const window = Dimensions.get('window')

const Tickets = (props) => {
    const [tickets, setTickets] = useState([])
    const [isFetchingTickets, setIsFetchingTickets] = useState(false)

    useEffect(() => {
        initDateParser('nl') //TODO move to splash screen
        fetchTickets()
    }, [])

    const fetchTickets = () => {
        setIsFetchingTickets(true)
        ApiHelper.get('/ticket')
            .then((res) => {
                const parsedTickets = []
                res.data.forEach((ticket) => {
                    ticket.parsedStatus = parseTicketStatus(ticket.status, 'en')
                    ticket.parsedUpdatedAt = parseDate(ticket.updatedAt)
                    ticket.parsedCreatedAt = parseDate(ticket.createdAt)
                    parsedTickets.push(ticket)
                    setIsFetchingTickets(false)
                })
                setTickets(parsedTickets)
            })
    }

    const viewTicket = (ticket) => {
        props.navigation.navigate('Details', {ticket})
    }

    const createTicketsList = () => {
        const ticketsListEl = []
        for (let i = 0; i < tickets.length; i++) {
            ticketsListEl.push(
                <TicketsListItem ticket={tickets[i]} viewTicket={viewTicket} key={i}/>
            )
        }
        return ticketsListEl
    }

    // Is used when no tickets are available; they're being fetched or don't exist
    const createTicketsReplacement = () => {
        if (tickets.length <= 0) {
            return isFetchingTickets
                ? <ActivityIndicator style={styles.loadingSpinner} size={'large'} color='#451864'/>
                : <StyledText inputStyle={styles.noTickets}>
                    {tr.ticket.noNotifications}
                </StyledText>
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.tickets}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>
                        {tr.ticket.notifications}
                    </StyledText>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
                        <PageActionButton icon={'plus'} text={tr.ticket.create}/>
                    </TouchableOpacity>

                    <View>
                        {tickets.length > 0
                            ? (createTicketsList())
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
    tickets: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 0,
        paddingBottom: 90
    },
    logo: {
        marginBottom: 10
    },
    pageTitle: {
        marginBottom: window.height / 40,
    },

    addButton: {
        marginVertical: 15,
        alignItems: 'center'
    },
    addButtonIconWrapper: {
        backgroundColor: '#A0CAE8',
        borderRadius: 50,
        width: window.width / 10 * 1.1,
        height: window.width / 10 * 1.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        marginTop: 4,
        fontSize: 11,
        color: 'black'
    },

    noTickets: {
        color: 'black',
        marginTop: '15%',
        opacity: 0.4
    },
    loadingSpinner: {
        marginTop: '15%'
    },
})

export default Tickets
