import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import Button from './Button'
import TicketComment from './TicketComment'
import StyledText from './StyledText'

const TicketCommentBox = (props) => {
    const [commentInputText, onCommentInputText] = useState('')

    const sendComment = () => {
        console.log(commentInputText)
    }

    const commentsEl = []
    for (let i = 0; i < props.comments.length; i++) {
        commentsEl.push(
            <TicketComment isUserTicket={true} comment={props.comments[i]}/>
        )
    }

    return (
        <View style={styles.ticketComments}>
            {/*<TicketComment isUserTicket={false}/>*/}
            {/*<TicketComment isUserTicket={true}/>*/}

            {commentsEl.length > 0
                ? commentsEl
                : (<StyledText inputStyle={styles.noComments}>
                        Er zijn nog geen opmerkingen geplaatst
                </StyledText>
            )}

            <View style={styles.commentInputFieldWrapper}>
                <AutoGrowingTextInput
                    style={styles.commentInputField}
                    onChangeText={ onCommentInputText }
                    placeholder={'Typ hier uw opmerking'}
                    multiline
                />
            </View>
            { commentInputText.length > 0 && (
                <Button withArrow style={styles.commentSendButton} pressAction={ sendComment }>
                    Versturen
                </Button>
            )}
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
    },
    noComments: {
        color: 'black',
        marginVertical: '5%',
        opacity: 0.4
    }
})

export default TicketCommentBox
