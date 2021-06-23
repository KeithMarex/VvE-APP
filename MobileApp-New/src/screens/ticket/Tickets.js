import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import StyledText from '../../components/StyledText'
import PageActionButton from '../../components/PageActionButton'
import TicketsListItem from '../../components/TicketsListItem'
import PageLogo from '../../components/PageLogo'
import ApiHelper from '../../util/ApiHelper'
import { initDateParser, parseDate } from '../../util/DateUtil'
import tra from "../../config/languages/translate";
import { getOrgColors } from '../../util/OrganizationUtil';

const window = Dimensions.get('window')

const Tickets = (props) => {
    const [tickets, setTickets] = useState([])
    const [isFetchingTickets, setIsFetchingTickets] = useState(false)
    let screenFocusSubscription
    const [colors, setColors] = useState({})
    const [tr, setTr] = useState({})

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })

        tra().then(res => {
            setTr(res)
        })

        initDateParser('nl') //TODO move to splash screen
        fetchTickets()
        screenFocusSubscription = props.navigation.addListener('focus', () => reloadTickets())

        return () => {
            props.navigation.removeListener('focus', () => reloadTickets())
        }
    }, [])

    const reloadTickets = () => {
        setTickets([])
        fetchTickets()
    }

    const fetchTickets = () => {
        setIsFetchingTickets(true)
        ApiHelper.get('/ticket')
            .then((res) => {
                const parsedTickets = []
                res.data.forEach((ticket) => {
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

    const createTicketsReplacement = () => {
        if (tickets.length <= 0) {
            return <ActivityIndicator style={styles.loadingSpinner} size={'large'} color={colors?.primarycolor}/>
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.tickets}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>
                        {tr.ticket?.notifications}
                    </StyledText>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
                        <PageActionButton icon={'plus'} text={tr.ticket?.create}/>
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
