import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import StyledText from '../../components/StyledText'
import { Logo, CommentIcon } from '../../resources'
import PageActionButton from '../../components/PageActionButton'
import StyledText from '../components/StyledText'
import { Logo, CommentIcon } from '../resources'
import PageActionButton from '../components/PageActionButton'
import TicketsListItem from '../components/TicketsListItem'

const window = Dimensions.get('window')

const Tickets = (props) => {
    const tickets = [
        {
            title: 'Titel van melding',
            description: 'Dit is een kleine beschrijving van de melding die is gedaan.',
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
    ]
    const ticketsListEl = []
    for (let i = 0; i < tickets.length; i++) {
        ticketsListEl.push(
            <TicketsListItem ticket={tickets[i]} key={i}/>
        )
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.tickets}>
                    <Logo style={styles.logo} width={window.width / 10 * 5} />
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>Meldingen</StyledText>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
                        <PageActionButton icon={'plus'} text={'Aanmaken'}/>
                    </TouchableOpacity>

                    <View>
                        {ticketsListEl}
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
})

export default Tickets;
