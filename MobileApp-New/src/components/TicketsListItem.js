import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CommentIcon} from "../resources"
import StyledText from './StyledText'
import Button from './Button'
import { parseTicketStatus } from '../util/ApiParseUtil'

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
                Status: { props.ticket.parsedStatus }
            </StyledText>

            <View style={styles.ticketBottom}>
                <View>
                    <StyledText inputStyle={styles.updatedAtText}>
                        Laatste wijziging:
                    </StyledText>
                    <StyledText inputStyle={styles.updatedAtText}>
                        { props.ticket.parsedUpdatedAt }
                    </StyledText>
                </View>

                <Button pressAction={viewTicket} withArrow>Meer info</Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    ticket: {
        minWidth: '100%',
        maxWidth: '100%',
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
        justifyContent: 'space-between',
    },
    ticketTitle: {
        textAlign: 'left',
        maxWidth: '80%',
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
    updatedAtText: {
        textAlign: 'left',
        fontSize: 10,
        color: '#6E7191',
        letterSpacing: 0.5,
        marginBottom: 3
    },
})

export default TicketsListItem
