import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import StyledText from './StyledText'
import Button from './Button'
import TicketComment from './TicketComment'

const TicketCommentBox = (props) => {
    return (
        <View style={styles.ticketComments}>
            <TicketComment isUserTicket={false}/>
            <TicketComment isUserTicket={true}/>

            <View style={styles.commentInputFieldWrapper}>
                <AutoGrowingTextInput
                    style={styles.commentInputField}
                    placeholder={'Typ hier uw opmerking'}
                    multiline
                />
            </View>
            <Button withArrow style={styles.commentSendButton}>
                Versturen
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    ticketComments: {
        minWidth: '100%',
        maxWidth: '100%'
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

export default TicketCommentBox
