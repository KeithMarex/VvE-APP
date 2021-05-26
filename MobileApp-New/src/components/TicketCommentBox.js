import React, { useState } from 'react'
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import Button from './Button'
import TicketComment from './TicketComment'
import StyledText from './StyledText'
import { PlusIcon } from '../resources'
import PageActionButton from "./PageActionButton";

const TicketCommentBox = (props) => {
    const [commentInputText, onCommentInputText] = useState('')
    const [comments, setComments] = useState(props.comments)

    const sendComment = () => {
        if (!commentInputText) return
        const newComment = {
            comment: commentInputText,
        }

        setComments([...comments, newComment])
    }

    const commentsEl = []
    for (let i = 0; i < comments.length; i++) {
        commentsEl.push(
            <TicketComment isUserTicket={true} comment={comments[i]} key={i}/>
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
            <View style={styles.commentActionButtons}>
                <TouchableOpacity onPress={() => alert('Add image')} style={styles.commentAddImageButton}>
                    <PlusIcon on stroke={'#F7F7FC'} width={20} height={20}/>
                </TouchableOpacity>
                { commentInputText.length > 0 && (
                    <Button withArrow style={styles.commentSendButton} pressAction={ sendComment }>
                        Versturen
                    </Button>
                )}
            </View>
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
    commentActionButtons: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    commentAddImageButton: {
        backgroundColor: '#A0CAE8',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentSendButton: {
        alignSelf: 'flex-end',
        width: Dimensions.get('window').width / 2.5,
        height: 30,
        marginLeft: 10
    },
    noComments: {
        color: 'black',
        marginVertical: '5%',
        opacity: 0.4
    }
})

export default TicketCommentBox
