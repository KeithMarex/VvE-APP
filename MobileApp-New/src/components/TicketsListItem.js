import React from 'react'
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'
import {CommentIcon} from "../resources";
import StyledText from "./StyledText";

const window = Dimensions.get('window')

const TicketsListItem = (props) => {
    return (
        <View style={styles.ticket}>

            <View style={styles.ticketHeader}>
                <StyledText inputStyle={styles.ticketTitle} theme={'cardHeader'}>
                    { props.ticket.title }
                </StyledText>
                <View style={styles.ticketCommentCount}>
                    <StyledText inputStyle={styles.ticketCommentCountAmount}>
                        { props.ticket.comments.length }
                    </StyledText>
                    <CommentIcon width={18} height={18} stroke={'#4E4B66'} />
                </View>
            </View>

            <StyledText inputStyle={styles.ticketDescription}>
                { props.ticket.description }
            </StyledText>

            <StyledText inputStyle={styles.ticketStatus}>
                Status: { props.ticket.status }
            </StyledText>

            <View style={styles.ticketBottom}>
                <View style={styles.lastUpdate}>
                    <StyledText inputStyle={styles.lastUpdateText}>Laatste wijziging:</StyledText>
                    <StyledText inputStyle={styles.lastUpdateText}>
                        { props.ticket.lastUpdate }
                    </StyledText>
                </View>

                <TouchableOpacity style={styles.ticketBtn} onPress={() => alert('Tapped ticket button')} >
                    <StyledText inputStyle={styles.ticketBtnText}>
                        Meer info &#62;
                    </StyledText>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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

export default TicketsListItem
