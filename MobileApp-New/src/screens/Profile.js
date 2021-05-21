import {
    StyleSheet,
    Keyboard,
    View,
    ScrollView,
    TouchableWithoutFeedback, Dimensions, Text
} from 'react-native'
import React from 'react'

import { ProfileIcon, MailIcon, PhoneIcon, Logo, NLFlag, ENFlag } from '../resources'
import { SafeAreaView } from 'react-navigation'
import PageActionButton from '../components/PageActionButton'
import StyledText from '../components/StyledText'

const window = Dimensions.get('window')

const Profile = () => {
    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <ScrollView style={styles.view}>
                    <View style={styles.home}>
                        <Logo style={styles.logo} width={window.width / 10 * 5}/>
                        <StyledText inputStyle={styles.pageTitle}>Algemeen</StyledText>
                        <PageActionButton icon={'pen'} text={'Wijzigen'}/>

                        <View style={styles.profileSection}>
                            <View style={{flexDirection: 'row', paddingTop: '5%', paddingBottom: '3%'}} >
                                <ProfileIcon stroke={'#451864'} style={{marginRight: '5%'}}/>
                                <StyledText inputStyle={styles.accountName}>Hicham Ben Yessef</StyledText>
                            </View>
                            <StyledText inputStyle={{paddingBottom: '3%', textAlign: 'left'}}>Hasebroekstraat 75 II</StyledText>
                            <View style={{flexDirection: 'row', paddingBottom: '3%'}}>
                                <MailIcon stroke={'#451864'} style={{marginRight: '2%'}} width={window.width / 15} />
                                <StyledText inputStyle={{color: '#6E7191'}}>hicham@hotmail.com</StyledText>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <PhoneIcon stroke={'#451864'} style={{marginRight: '2%'}} width={window.width / 15} />
                                <StyledText inputStyle={{color: '#6E7191'}}>06-12345678</StyledText>
                            </View>

                            <StyledText inputStyle={styles.organizationsSection}>VvE</StyledText>
                            <StyledText inputStyle={{color: 'black', textAlign: 'left'}}>De Nieuwe Wereld</StyledText>
                            <StyledText inputStyle={styles.organizationAddress}>Hasebroekstraat</StyledText>
                            <StyledText inputStyle={{color: 'black', textAlign: 'left'}}>Parkeerplaats</StyledText>
                            <StyledText inputStyle={[styles.organizationAddress, {marginBottom: '10%'}]}>Autoplaatsplekstraat</StyledText>
                        </View>
                        <StyledText inputStyle={[styles.accountName, {marginTop: '5%'}]}>Taal</StyledText>
                        <View style={{flexDirection: 'row', marginTop: '5%'}}>
                            <NLFlag style={{marginLeft: '2%', marginRight: '2%'}}/>
                            <ENFlag style={{marginLeft: '2%', marginRight: '2%'}}/>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    organizationAddress: {
        color: '#858585',
        marginLeft: '5%',
        textAlign: 'left'
    },
    organizationsSection: {
        marginTop: '10%',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left'
    },
    view: {
        width: '100%',
        backgroundColor: '#F7F7FC',
    },
    home: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 30,
        paddingBottom: 90
    },
    logo: {
        marginBottom: 10
    },
    pageTitle: {
        marginBottom: window.height / 40,
        fontSize: 28,
        fontWeight: 'bold'
    },
    profileSection: {
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: '7%',
        paddingVertical: '2%',
        borderRadius: 20,
        borderColor: '#f8f8f8',
        borderWidth: 5,
    },
    accountName: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left'
    }
});

export default Profile;