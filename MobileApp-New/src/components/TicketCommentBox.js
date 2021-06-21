import React, { useState, createRef, useEffect } from 'react'
import {
    Dimensions,
    Keyboard,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    TextInput,
    AsyncStorage
} from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import Button from './Button'
import TicketComment from './TicketComment'
import StyledText from './StyledText'
import { PlusIcon } from '../resources'
import ApiHelper from "../util/ApiHelper";
import tra from "../config/languages/translate";

const TicketCommentBox = (props) => {
    const [commentInputText, onCommentInputText] = useState('')
    const [comments, setComments] = useState(props.ticket.comments)
    const [tr, setTr] = React.useState({})

    tra().then(res => {
        setTr(res);
    })

    const sendComment = async () => {
        if (!commentInputText) return
        const newComment = {
            comment: commentInputText,
        }

        const fd = new FormData
        fd.append('ticketID', props.ticket._id)
        fd.append('comment', commentInputText)
        // fd.append('images', null)
        await ApiHelper.post('/comment', fd, {'content-type': 'multipart/form-data'})
            .then(() => {
                setComments([...comments, newComment])
                Keyboard.dismiss()
                clearCommentInput()
            })
    }

    const isUserComment = async (comment) => {
        return comment.user._id === await AsyncStorage.getItem('userId');
    }

    const clearCommentInput = () => {
        // commentInputRef.clear()
        onCommentInputText('')
    }

    const commentsEl = []
    for (let i = 0; i < comments.length; i++) {
        commentsEl.push(
            <TicketComment isUserComment={isUserComment(comments[i])} comment={comments[i]} key={i}/>
        )
    }

    return (
        <KeyboardAvoidingView style={styles.ticketComments}>
            {/*<TicketComment isUserTicket={false}/>*/}
            {/*<TicketComment isUserTicket={true}/>*/}

            {commentsEl.length > 0
                ? commentsEl
                : (<StyledText inputStyle={styles.noComments}>
                        {tr.ticket?.noComments}
                </StyledText>
            )}

            <View style={styles.commentInputFieldWrapper}>
                <TextInput
                    style={styles.commentInputField}
                    onChangeText={onCommentInputText}
                    placeholder={tr.ticket?.placeholder}
                    multiline
                />
            </View>
            <View style={styles.commentActionButtons}>
                <TouchableOpacity onPress={() => alert('Add image')} style={styles.commentAddImageButton}>
                    <PlusIcon stroke={'#F7F7FC'} width={20} height={20}/>
                </TouchableOpacity>
                { commentInputText.length > 0 && (
                    <Button withArrow style={styles.commentSendButton} pressAction={sendComment}>
                        {tr.ticket?.send}
                    </Button>
                )}
            </View>
        </KeyboardAvoidingView>
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
