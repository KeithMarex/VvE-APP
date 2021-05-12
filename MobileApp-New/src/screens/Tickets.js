import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import StyledText from '../components/StyledText'
import { Logo, CommentIcon } from '../resources'
import PageActionButton from '../components/PageActionButton'

const window = Dimensions.get('window')

const Tickets = (props) => {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.tickets}>
                    <Logo style={styles.logo} width={window.width / 10 * 5} />
                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>Meldingen</StyledText>
                    <PageActionButton icon={'plus'} text={'Aanmaken'}/>

                    <View>
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

                                <TouchableOpacity style={styles.ticketBtn} onPress={() => alert('Tapped ticket button')} >
                                    <StyledText inputStyle={styles.ticketBtnText}>
                                        Meer info &#62;
                                    </StyledText>
                                </TouchableOpacity>
                            </View>

                        </View>

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

                                <TouchableOpacity style={styles.ticketBtn} onPress={() => alert('Tapped ticket button')}>
                                    <StyledText inputStyle={styles.ticketBtnText}>
                                        Meer info &#62;
                                    </StyledText>
                                </TouchableOpacity>
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

    ticket: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#f8f8f8',
        borderWidth: 5,
        paddingVertical: 20,
        paddingHorizontal: '7%',
        marginBottom: 8
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
        flexDirection: 'row'
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
    ticketBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lastUpdateText: {
        textAlign: 'left',
        fontSize: 10,
        color: '#6E7191',
        letterSpacing: 0.5,
        marginBottom: 3
    },
    ticketBtn: {
        borderColor: '#A0CAE8',
        borderWidth: 2,
        borderRadius: 40,
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    ticketBtnText: {
        color: '#A0CAE8',
        fontSize: 14,
        fontWeight: 'bold'
    }

})

export default Tickets;
