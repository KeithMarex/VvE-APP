import {
    StyleSheet,
    Keyboard,
    View,
    ScrollView,
    TouchableWithoutFeedback, Dimensions, Text
} from "react-native";
import React from "react";

import { ProfileIcon, MailIcon, PhoneIcon, Logo, EditButton, NLFlag, ENFlag } from '../resources';

const window = Dimensions.get('window');

const Profile = () => {
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <ScrollView style={styles.view}>
                <View style={styles.home}>
                    <Logo style={styles.logo} width={window.width / 10 * 5}/>
                    <Text style={styles.topBeschrijving}>Algemeen</Text>
                    <EditButton style={{marginBottom: '5%'}}/>

                    <View style={styles.profileSection}>
                        <View style={{flexDirection: 'row', paddingTop: '5%', paddingBottom: '3%'}} >
                            <ProfileIcon stroke={'#451864'} style={{marginRight: '5%'}}/>
                            <Text style={styles.accountName}>Hicham ben Yessef</Text>
                        </View>
                        <Text style={{paddingBottom: '3%'}}>Hasebroekstraat 75 ||</Text>
                        <View style={{flexDirection: 'row', paddingBottom: '3%'}}>
                            <MailIcon stroke={'#451864'} style={{marginRight: '2%'}} width={window.width / 15} />
                            <Text>hicham@hotmail.com</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <PhoneIcon stroke={'#451864'} style={{marginRight: '2%'}} width={window.width / 15} />
                            <Text>06-12345678</Text>
                        </View>

                        <Text style={styles.vveTekst}>VvE</Text>
                        <Text>De Nieuwe Wereld</Text>
                        <Text style={styles.tussenTekst}>Hasebroekstraat</Text>
                        <Text>Parkeerplaats</Text>
                        <Text style={[styles.tussenTekst, {marginBottom: '10%'}]}>Autoplaatsplekstraat</Text>
                    </View>
                    <Text style={[styles.accountName, {marginTop: '5%'}]}>Taal</Text>
                    <View style={{flexDirection: 'row', marginTop: '5%'}}>
                        <NLFlag style={{marginLeft: '2%', marginRight: '2%'}}/>
                        <ENFlag style={{marginLeft: '2%', marginRight: '2%'}}/>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    tussenTekst: {
        color: '#858585',
        marginLeft: '5%'
    },
    vveTekst: {
        marginTop: '10%',
        color: '#451864',
        fontWeight: 'bold',
        fontSize: 20,
    },
    view: {
        width: '100%',
        backgroundColor: '#F7F7FC',
    },
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    logo: {
        width: window.width / 10 * 5,
        height: window.height / 6,
        marginBottom: 10
    },
    topBeschrijving: {
        color: '#451864',
        marginBottom: window.height / 40,
        fontSize: 28,
        fontWeight: 'bold'
    },
    profileSection: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    accountName: {
        color: '#451864',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default Profile;
