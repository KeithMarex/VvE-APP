import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import StyledText from '../../components/StyledText'
import { Logo } from '../../resources'
import PageActionButton from '../../components/PageActionButton'
import TicketsListItem from '../../components/TicketsListItem'
import axios from 'axios'
import PageLogo from "../../components/PageLogo";

const window = Dimensions.get('window')

const Tickets = (props) => {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        fetchTickets()
    }, [])

    const fetchTickets = () => {
        setTickets([
            {
                title: 'Mijn leidingen zijn vervuild en ik ben boos en verdrietig.',
                description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
                comments: ['1', '2'],
                lastUpdate: '13 mei 2021 15:30',
                status: 'In behandeling'
            },
            {
                title: 'Andere melding',
                description: 'Dit is een andere melding.',
                comments: ['1', '2', '3'],
                lastUpdate: '15 mei 2021 15:30',
                status: 'In behandeling'
            },
        ])

        // TODO fetch from API
        // axios.get('/ticket')
        //     .then(r => console.log(r))
        //     .catch((err) => console.log(err))
    }

    const viewTicket = (ticket) => {
        props.navigation.navigate('Details', {ticket})
    }

    const ticketsListEl = []
    for (let i = 0; i < tickets.length; i++) {
        ticketsListEl.push(
            <TicketsListItem ticket={tickets[i]} viewTicket={viewTicket} key={i}/>
        )
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.tickets}>
                    <PageLogo/>
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>
                        Meldingen
                    </StyledText>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
                        <PageActionButton icon={'plus'} text={'Aanmaken'}/>
                    </TouchableOpacity>

                    <View>
                        {ticketsListEl.length > 0 ? ticketsListEl : (
                            <StyledText inputStyle={styles.noTickets}>
                                U heeft nog geen meldingen gedaan.
                            </StyledText>
                        )}
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
    }
})

export default Tickets
