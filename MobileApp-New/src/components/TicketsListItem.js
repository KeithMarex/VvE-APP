import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { CommentIcon, ArrowIcon } from "../resources"
import StyledText from './StyledText'

const window = Dimensions.get('window')

const TicketsListItem = (props) => {
    const viewTicket = () => {
        props.viewTicket(props.ticket)
    }

    const truncateContent = (input) => {
        if (!input) return

        const MAX = 110
        let content

        if (input.length > MAX)
            content = input.substring(0, MAX) + '...'
        else
            content = input

        return content.replace(/\r?\n|\r/g, ' ')
    }

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
                { truncateContent(props.ticket.description) }
            </StyledText>

            <StyledText inputStyle={styles.ticketStatus}>
                Status: { props.ticket.status }
            </StyledText>

            <View style={styles.ticketBottom}>
                <View style={styles.lastUpdate}>
                    <StyledText inputStyle={styles.lastUpdateText}>
                        Laatste wijziging:
                    </StyledText>
                    <StyledText inputStyle={styles.lastUpdateText}>
                        { props.ticket.lastUpdate }
                    </StyledText>
                </View>

                <TouchableOpacity style={styles.ticketBtn} onPress={ viewTicket }>
                    <StyledText inputStyle={styles.ticketBtnText}>
                        Meer info
                    </StyledText>
                    <ArrowIcon width={14} height={14} stroke={'#A0CAE8'} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    ticket: {
        width: '100%',
        minWidth: '100%',
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
        flexDirection: 'row',
        alignItems: 'center'
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
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        flexDirection: 'row'
    },
    ticketBtnText: {
        color: '#A0CAE8',
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 4
    }
})

export default TicketsListItem
