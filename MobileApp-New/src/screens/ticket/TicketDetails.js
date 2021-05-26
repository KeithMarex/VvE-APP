import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TextInput} from 'react-native'
import React, {useState} from 'react'
import StyledText from '../../components/StyledText'
import PageLogo from '../../components/PageLogo'
import Button from '../../components/Button'
import {AutoGrowingTextInput} from "react-native-autogrow-textinput";

const window = Dimensions.get('window')

const TicketDetails = (props) => {
    const [ticket, setTicket] = useState(props.route.params.ticket)

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.ticketDetails}>

                    <PageLogo/>

                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>
                        { ticket.title }
                    </StyledText>
                    <View style={styles.ticketInfo}>
                        <StyledText inputStyle={styles.ticketInfoDate}>
                            Aangemaakt op: { ticket.parsedCreatedAt }
                        </StyledText>
                        <StyledText inputStyle={styles.ticketInfoDate}>
                            Laatste wijziging: { ticket.parsedUpdatedAt }
                        </StyledText>
                        <StyledText inputStyle={styles.ticketInfoStatus}>
                            Status: { ticket.parsedStatus }
                        </StyledText>
                    </View>

                    <View style={styles.ticketSection}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>
                            Uw afbeeldingen
                        </StyledText>
                        <Button>
                            Afbeeldingen inzien
                        </Button>
                    </View>

                    <View style={styles.ticketSection}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>
                            Bericht
                        </StyledText>
                        <StyledText inputStyle={styles.ticketContent}>
                            { ticket.description }
                        </StyledText>
                    </View>

                    <View style={styles.ticketSection}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>
                            Opmerkingen
                        </StyledText>
                        <View style={styles.ticketComments}>
                            <View style={[styles.commentWrapper, styles.orgCommentWrapper]}>
                                <View style={[styles.ticketComment, styles.orgComment]}>
                                    <StyledText inputStyle={styles.orgCommentUser}>
                                        Bestuur
                                    </StyledText>
                                    <StyledText inputStyle={styles.ticketCommentContent}>
                                        Ik heb nog extra informatie nodig met betrekking tot het probleem die u nu ondervindt.
                                    </StyledText>
                                    <StyledText inputStyle={styles.ticketCommentDate}>
                                        14 mei 2021 15:30
                                    </StyledText>
                                </View>
                            </View>

                            <View style={styles.yourCommentWrapper}>
                                <View style={[styles.ticketComment, styles.yourComment]}>
                                    <StyledText inputStyle={styles.yourCommentUser}>
                                        U
                                    </StyledText>
                                    <StyledText inputStyle={styles.ticketCommentContent}>
                                        Ik heb nog extra informatie nodig met betrekking tot het probleem die u nu ondervindt.
                                    </StyledText>
                                    <StyledText inputStyle={styles.ticketCommentDate}>
                                        14 mei 2021 15:30
                                    </StyledText>
                                </View>
                            </View>

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
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F7F7FC',
        height: '100%',
    },
    ticketDetails: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 0,
        paddingBottom: 90,
    },
    pageTitle: {
    },
    ticketInfo: {
        marginVertical: window.height / 40,
    },
    ticketInfoDate: {
        fontSize: 12,
        color: '#6E7191',
        letterSpacing: 0.5,
        marginBottom: 3
    },
    ticketInfoStatus: {
        marginVertical: 1.5,
        color: '#14142B',
        fontSize: 15
    },

    ticketSection: {
        marginVertical: window.height / 40,
    },
    sectionHeader: {
        marginBottom: 7
    },

    ticketContent: {
        color: '#6E7191',
        fontSize: 14,
        textAlign: 'left',
        lineHeight: 17,
        letterSpacing: 1.1,
    },

    ticketComments: {
        minWidth: '100%',
        maxWidth: '100%'
    },
    commentWrapper: {
        width: '100%',
        marginBottom: 10
    },
    orgCommentWrapper: {
        alignItems: 'flex-start'
    },
    yourCommentWrapper: {
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
    yourComment: {
        backgroundColor: '#E4DAFF'
    },
    orgCommentUser: {
        textAlign: 'left',
        color: '#6E7191',
    },
    yourCommentUser: {
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

export default TicketDetails
