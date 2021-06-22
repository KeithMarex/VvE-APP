import React, { useState, useRef } from 'react'
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
import OptionsMenu from 'react-native-option-menu'
import { PlusIcon } from '../resources'
import ApiHelper from '../util/ApiHelper'
import tra from '../config/languages/translate'
import { pickGalleryImage, takeCameraImage } from '../util/ImageUtil'
import Button from './Button'
import TicketComment from './TicketComment'
import StyledText from './StyledText'
import InputImage from './InputImage'

const TicketCommentBox = (props) => {
    const [commentInputText, onCommentInputText] = useState('')
    const [comments, setComments] = useState(props.ticket.comments)
    const [images, setImages] = useState([])
    const [tr, setTr] = useState({})
    const inputRef = useRef('')

    tra().then(res => {
        setTr(res)
    })

    const sendComment = async () => {
        if (!commentInputText) return

        Keyboard.dismiss()

        const fd = new FormData
        fd.append('ticketID', props.ticket._id)
        fd.append('comment', commentInputText)
        images.forEach((image, index) => {
            fd.append(`file${index+1}` , {
                name: image['uri'].split('ImageManipulator/')[1],
                type: 'image/png',
                uri: image['uri']
            })
        })

        await ApiHelper.post('/comment', fd, {'content-type': 'multipart/form-data'})
            .then((res) => {
                setComments([...comments, res.data])
                setImages([])
                clearCommentInput()
            }).catch((err) => {
                console.log(err)
                alert('Er is iets fout gegaan. Probeer het opnieuw.')
            })
    }

    const isUserComment = async (comment) => {
        return comment.user._id === await AsyncStorage.getItem('userId')
    }

    const onTakeCameraImagePressed = async () => {
        const takenPicture = await takeCameraImage()
        if (!takenPicture)
            return
        setImages((images) => [...images, takenPicture])
    }

    const onPickGalleryImagePressed = async () => {
        const pickedImage = await pickGalleryImage()
        if (!pickedImage)
            return
        setImages((images) => [...images, pickedImage])
    }

    const removeImage = (image) => {
        const array = [...images]
        const index = array.indexOf(image)
        if (index !== -1) {
            array.splice(index, 1)
            setImages(array)
        }
    }

    const clearCommentInput = () => {
        inputRef.current.clear()
        onCommentInputText('')
    }

    return (
        <KeyboardAvoidingView style={styles.ticketComments}>
            {comments.length > 0
                ? comments.map(comment => (
                    <TicketComment isUserComment={isUserComment(comment)} comment={comment} key={comment._id}/>
                ))
                : <StyledText inputStyle={styles.noComments}>
                    {tr.ticket?.noComments}
                </StyledText>
            }

            <View style={styles.commentInputFieldWrapper}>
                <TextInput
                    style={styles.commentInputField}
                    onChangeText={onCommentInputText}
                    placeholder={tr.ticket?.placeholder}
                    ref={inputRef}
                    multiline
                />
            </View>
            <View style={styles.commentActionButtons}>
                <TouchableOpacity style={styles.commentAddImageButton}>
                    <OptionsMenu
                        customButton={<PlusIcon stroke={'#F7F7FC'} width={20} height={20}/>}
                        options={[`${tr.ticket?.photo.makePhoto}`, `${tr.ticket?.photo.choosePicture}`, `${tr.ticket?.photo.cancel}`]}
                        actions={[onTakeCameraImagePressed, onPickGalleryImagePressed]}
                    />
                </TouchableOpacity>
                { commentInputText.length > 0 && (
                    <Button withArrow style={styles.commentSendButton} pressAction={sendComment}>
                        {tr.ticket?.send}
                    </Button>
                )}
            </View>
            <View style={styles.commentInputImages}>
                { images.map(image => (
                    <InputImage image={image} removeImage={() => {removeImage(image)}} key={image['uri'].split('ImageManipulator/')[1]}/>
                )) }
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
    },
    commentInputImages: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    }
})

export default TicketCommentBox
