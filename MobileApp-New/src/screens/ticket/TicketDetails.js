import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions} from 'react-native'
import React from 'react'
import StyledText from '../../components/StyledText'
import PageLogo from '../../components/PageLogo'
import Button from '../../components/Button'
import TicketCommentBox from '../../components/TicketCommentBox'
import ApiHelper from "../../util/ApiHelper";
import tra from "../../config/languages/translate";

const window = Dimensions.get('window')

const TicketDetails = (props) => {
    const { ticket } = props.route.params

    const showImages = () => {
        props.navigation.navigate('ShowImages', { ticket });
    }

    const [tr, setTr] = React.useState({})

    tra().then(res => {
        setTr(res);
    })

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.ticketDetails}>

                    <PageLogo/>

                    <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>
                        { ticket.title }
                    </StyledText>
                    <View style={styles.ticketInfo}>
                        <StyledText inputStyle={styles.ticketInfoDate}>
                            {tr.ticket?.createdOn}: { ticket.parsedCreatedAt }
                        </StyledText>
                        <StyledText inputStyle={styles.ticketInfoDate}>
                            {tr.ticket?.lastModified}: { ticket.parsedUpdatedAt }
                        </StyledText>
                        <StyledText inputStyle={styles.ticketInfoStatus}>
                            {tr.ticket?.status}: { ticket.parsedStatus }
                        </StyledText>
                    </View>

                    {ticket.images.length !== 0 &&
                    <View style={styles.ticketSection}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>
                            {tr.ticket?.pictures}
                        </StyledText>
                        <Button pressAction={() => {showImages()}}>
                            {tr.ticket?.showPictures}
                        </Button>
                    </View>
                    }

                    <View style={styles.ticketSection}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>
                            {tr.ticket?.message}
                        </StyledText>
                        <StyledText inputStyle={styles.ticketContent}>
                            { ticket.description }
                        </StyledText>
                    </View>

                    <View style={styles.ticketSection}>
                        <StyledText inputStyle={styles.sectionHeader} theme={'sectionHeader'}>
                            {tr.ticket?.comments}
                        </StyledText>
                        <TicketCommentBox comments={ticket.comments}/>
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
})

export default TicketDetails
