import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import StyledText from "./StyledText";
import Button from './Button'

const TicketComment = (props) => {
    const { isUserTicket } = props
    const commentType = isUserTicket ? 'user' : 'org'

    return (
        <View style={styles[commentType + 'CommentWrapper']}>
            <View style={[styles.ticketComment, styles[commentType + 'Comment']]}>
                <StyledText inputStyle={styles[commentType + 'CommentUser']}>
                    { isUserTicket ? 'U' : 'Bestuur' }
                </StyledText>
                <StyledText inputStyle={styles.ticketCommentContent}>
                    Ik heb nog extra informatie nodig met betrekking tot het probleem die u nu ondervindt.
                </StyledText>
                <StyledText inputStyle={styles.ticketCommentDate}>
                    14 mei 2021 15:30
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
    },

    commentInputFieldWrapper: {
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    commentInputField: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        maxHeight: 120,
        minHeight: 50,
        fontSize: 14
    },
    commentSendButton: {
        alignSelf: 'flex-end',
        width: Dimensions.get('window').width / 2.5,
    }
})

export default TicketComment
