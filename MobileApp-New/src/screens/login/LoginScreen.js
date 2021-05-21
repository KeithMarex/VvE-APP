import React from 'react'
import { Text, StyleSheet, View, Image, Dimensions, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import Mail from '../../resources/icons/login/Mail.svg'
import Lock from '../../resources/icons/login/Lock.svg'
import { Logo } from '../../resources'
import ApiHelper from '../../api/ApiHelper'

const ss = Dimensions.get('window')

const LoginScreen = (props) => {
    const [username, onChangeName] = React.useState("")
    const [pass, onChangePass] = React.useState("")
    const [results, setResults] = React.useState([])

    const loginUser = async (email, password) => {
        console.log(email, password);
        const response = await ApiHelper.post('/user/login', JSON.stringify({email: email, password: password}), {headers: {'Content-Type': 'application/json'}});

        console.log(response);
    };

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.view}>
                <Logo width={ss.width / 10 * 7} style={styles.logo} />
                <View style={styles.emailField}>
                    <Mail style={styles.svg} stroke={'#A0A3BD'}/>
                    <TextInput style={styles.input} onChangeText={onChangeName} value={username} placeholder="Email" />
                </View>
                <View style={styles.emailField}>
                    <Lock style={styles.svg} stroke={'#A0A3BD'}/>
                    <TextInput style={styles.input} onChangeText={onChangePass} secureTextEntry={true} value={pass} placeholder="Password" />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => { loginUser(username, pass); }}><Text style={styles.text}>Login</Text></TouchableOpacity>
                <TouchableOpacity style={styles.passForgotBtn} onPress={() => props.navigation.navigate('login_forget')}><Text style={styles.passForgot}>Wachtwoord vergeten?</Text></TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    svg: {
        marginLeft: ss.width / 25,
    },
    emailField: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF0F7',
        borderRadius: 10,
        marginBottom: Dimensions.get('window').height / 30 * 1,
        width: Dimensions.get('window').width / 10 * 7,
    },
    input: {
        flex: 1,
        height: Dimensions.get('window').height / 30 * 2,
        borderRadius: 10,
        paddingLeft: ss.height / 75
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
      justifyContent: 'center',
      alignItems: 'center'
  },
    logo: {
        width: Dimensions.get('window').width / 10 * 7,
        marginBottom: ss.height / 30
    },
    loginButton: {
        backgroundColor: '#A0CAE8',
        width: Dimensions.get('window').width / 10 * 7,
        height: Dimensions.get('window').height / 30 * 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoginScreen;
