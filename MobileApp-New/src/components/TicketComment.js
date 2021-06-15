import React from 'react'
import { StyleSheet, View } from 'react-native'
import StyledText from "./StyledText";
import { parseDate } from "../util/DateUtil";

const TicketComment = (props) => {
    const { isUserTicket, comment } = props
    const commentType = isUserTicket ? 'user' : 'org'

    return (
        <View style={styles[commentType + 'CommentWrapper']}>
            <View style={[styles.ticketComment, styles[commentType + 'Comment']]}>
                <StyledText inputStyle={styles[commentType + 'CommentUser']}>
                    { isUserTicket ? 'U' : 'Bestuur' }
                </StyledText>
                <StyledText inputStyle={styles.ticketCommentContent}>
                    {comment.comment}
                </StyledText>
                <StyledText inputStyle={styles.ticketCommentDate}>
                    {parseDate(comment.createdAt)}
                </StyledText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    orgCommentWrapper: {
        marginBottom: 10,
        alignItems: 'flex-start'
    },
    userCommentWrapper: {
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    ticketComment: {
        width: '90%',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8
    },
    orgComment: {
        backgroundColor: '#fff'
    },
    userComment: {
        backgroundColor: '#E4DAFF'
    },
    orgCommentUser: {
        textAlign: 'left',
        color: '#6E7191',
    },
    userCommentUser: {
        textAlign: 'right',
        color: '#6E7191',
    },
    ticketCommentContent: {
        textAlign: 'left',
        color: 'black',
        marginVertical: 2
    },
    ticketCommentDate: {
        color: '#6E7191',
        fontSize: 12,
        textAlign: 'right'
    }
})

export default TicketComment
