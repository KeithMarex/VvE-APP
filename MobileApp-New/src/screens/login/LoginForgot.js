import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback, NativeModules,
} from "react-native";
import Mail from '../../resources/icons/login/Mail.svg';
import isEmail from 'validator/lib/isEmail';
import ApiHelper from "../../util/ApiHelper";
import {Logo} from "../../resources";
import tr from '../../config/languages/translate';

const ss = Dimensions.get('window');

const LoginForgot = (props) => {
    const [email, onChangeEmail] = React.useState("");

    const handleEmail = () => {
        console.log(tr);
        (isEmail(email)) ? goBack() : alert('Vul een geldig email adres in');
    }

    const goBack = () => {
        ApiHelper.post('/user/forgot', {email: email}).then(res => {
            props.navigation.navigate('login');
            alert('Als er een geldig account is gekoppeld aan het opgegeven email adres zal u spoedig een mail ontvangen.');
        }).catch(() => {
            alert('Er is geen account gekoppeld aan het opgegeven email adres');
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.view}>
                <Logo width={ss.width / 10 * 7} style={styles.logo} />
                <Text style={styles.topBeschrijving}>{tr.login.pass_forget}</Text>
                <View style={styles.emailField}>
                    <Mail style={styles.svg} stroke={'#A0A3BD'}/>
                    <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} placeholder="Email" />
                </View>
                <Text style={styles.beschrijving}>Er wordt een nieuw wachtwoord naar uw mail adres gestuurd.</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => handleEmail()}><Text style={styles.text}>Wachtwoord herstellen</Text></TouchableOpacity>
                <TouchableOpacity style={styles.passForgotBtn} onPress={() => props.navigation.navigate('login')}><Text style={styles.passForgot}>Terug naar login</Text></TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    svg: {
        marginLeft: ss.width / 25
    },
    topBeschrijving: {
        color: '#451864',
        marginBottom: ss.height / 40,
        fontSize: ss.width / 20,
        fontWeight: 'bold'
    },
    beschrijving: {
        marginBottom: ss.height / 40,
        width: Dimensions.get('window').width / 10 * 7,
        color: '#838386'
    },
    text: {
        color: '#fff',
    },
    passForgot: {
        textDecorationLine: 'underline',
    },
    passForgotBtn: {
        marginTop: ss.height / 30
    },
    view: {
        flex: 1,
        backgroundColor: '#F7F7FC',
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: Dimensions.get('window').width / 10 * 7,
        marginBottom: ss.height / 30
    },
    input: {
        flex: 1,
        height: Dimensions.get('window').height / 30 * 2,
        borderRadius: 10,
        paddingLeft: ss.height / 75
    },
    inputLogo: {
      color: '#000'
    },
    loginButton: {
        backgroundColor: '#A0CAE8',
        width: Dimensions.get('window').width / 10 * 7,
        height: Dimensions.get('window').height / 30 * 2,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    emailField: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF0F7',
        borderRadius: 10,
        marginBottom: Dimensions.get('window').height / 30,
        width: Dimensions.get('window').width / 10 * 7,
    }
});

export default LoginForgot;
