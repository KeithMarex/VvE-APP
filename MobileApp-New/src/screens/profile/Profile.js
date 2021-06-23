import {
    StyleSheet,
    Keyboard,
    View,
    ScrollView,
    TouchableWithoutFeedback, Dimensions, AsyncStorage
} from 'react-native'
import React, {useEffect, useState} from 'react'

import { ProfileIcon, MailIcon, PhoneIcon } from '../../resources'
import { SafeAreaView } from 'react-navigation'
import PageActionButton from '../../components/PageActionButton'
import StyledText from '../../components/StyledText'
import PageLogo from "../../components/PageLogo";
import tra from "../../config/languages/translate";
import { getOrgColors, getOrgName } from '../../util/OrganizationUtil'
import LanguageSelector from '../../components/LanguageSelector'
import ApiHelper from "../../util/ApiHelper";

const window = Dimensions.get('window')

const Profile = () => {
    const [colors, setColors] = useState({})
    const [tr, setTr] = useState({})
    const [orgName, setOrgName] = useState('')

    const user = props.route.params.user;

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })

        getOrgName().then(name => {
            setOrgName(name)
        })

        tra().then(res => {
            setTr(res)
        })
    }, [])

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <ScrollView style={styles.view}>
                    <View style={styles.home}>
                        <PageLogo/>
                        <StyledText inputStyle={styles.pageTitle}>{tr.profile?.general}</StyledText>

                        <View style={styles.profileSection}>
                            <View style={{flexDirection: 'row', paddingTop: '5%', paddingBottom: '3%'}} >
                                <ProfileIcon stroke={colors?.primarycolor} style={{marginRight: '5%'}}/>
                                <StyledText inputStyle={styles.accountName}>{user._firstname} {user._lastname}</StyledText>
                            </View>
                            {/*<StyledText inputStyle={{paddingBottom: '3%', textAlign: 'left'}}>Hasebroekstraat 75 II</StyledText>*/}
                            <View style={{flexDirection: 'row', paddingBottom: '3%'}}>
                                <MailIcon stroke={colors?.primarycolor} style={{marginRight: '2%'}} width={window.width / 15} />
                                <StyledText inputStyle={{color: '#6E7191'}}>{user._email}</StyledText>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <PhoneIcon stroke={'#451864'} style={{marginRight: '2%'}} width={window.width / 15} />
                                <StyledText inputStyle={{color: '#6E7191'}}>06-12345678</StyledText>
                            </View>

                            <StyledText inputStyle={styles.organizationsSection}>{tr.home?.vveinfo}</StyledText>
                            <StyledText inputStyle={{color: 'black', textAlign: 'left'}}>
                                { orgName }
                            </StyledText>
                            { user?.parking && (
                                <StyledText inputStyle={{color: 'black', textAlign: 'left'}}>
                                    { tr.home?.parking }
                                </StyledText>
                            )}
                        </View>

                        <StyledText inputStyle={[styles.accountName, {marginTop: '5%'}]}>{tr.profile?.language}</StyledText>
                        <LanguageSelector/>
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
        marginTop: '7%',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left'
    },
    view: {
        width: '100%',
        backgroundColor: '#F7F7FC',
        height: '100%'
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
        paddingTop: '2%',
        paddingBottom: '8%',
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
