import React, { useEffect, useState } from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import StyledText from "./StyledText";
import { parseDate } from "../util/DateUtil";
import { getOrgColors } from '../util/OrganizationUtil'

const TicketComment = (props) => {
    const [colors, setColors] = useState({})
    const { isUserComment, comment } = props
    const commentType = isUserComment ? 'user' : 'org'

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })
    }, [])

    const showCommentImage = (image) => {
        props.navigation.navigate('ShowCommentImage', { image });
    }

    return (
        <View style={styles[commentType + 'CommentWrapper']}>
            <View style={[
                styles.ticketComment, styles[commentType + 'Comment'],
                isUserComment ? {backgroundColor: colors?.primarycolor + '1A'} : undefined]}
            >
                <StyledText inputStyle={styles[commentType + 'CommentUser']}>
                    { isUserComment ? 'U' : 'Bestuur' }
                </StyledText>
                <StyledText inputStyle={styles.ticketCommentContent}>
                    {comment.comment}
                </StyledText>
                { comment.images.length > 0 && (
                    <View style={styles.imagesContainer}>
                        { comment.images.map((image, i) => (
                            <TouchableOpacity onPress={() => showCommentImage(image.image_url)} style={styles.imageWrapper} key={i}>
                                <Image style={styles.image}
                                       source={{uri: image.image_url}}
                                />
                            </TouchableOpacity>
                            )
                        )}
                    </View>
                )}
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
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    orgComment: {
        backgroundColor: '#fff'
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
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginVertical: 7
    },
    imageWrapper: {
        marginHorizontal: 4,
        marginVertical: 4,
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%'
    },
})

export default TicketComment
