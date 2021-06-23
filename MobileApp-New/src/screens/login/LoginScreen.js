import React, {useState} from 'react'
import {
    Text,
    StyleSheet,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    AsyncStorage
} from 'react-native'
import Mail from '../../resources/icons/login/Mail.svg'
import Lock from '../../resources/icons/login/Lock.svg'
import { Logo } from '../../resources'
import ApiHelper from '../../util/ApiHelper'
import UserModel from '../../models/user.model'
import tra from '../../config/languages/translate'
import { initOrg } from '../../util/OrganizationUtil'
import {initDateParser} from "../../util/DateUtil";

const ss = Dimensions.get('window')

const LoginScreen = (props) => {
    const [username, onChangeName] = React.useState("")
    const [pass, onChangePass] = React.useState("")
    const [results, setResults] = React.useState([])
    const [tr, setTr] = React.useState({})

    tra().then(res => {
        setTr(res)
    })

    const loginUser = async (email, password) => {
        await ApiHelper.post('/user/login', {email: email, password: password})
            .then(async (res) => {
                const d = res.data
                const user = new UserModel(d.role, d.organizations, d.parking, d._id, d.email, d.firstname, d.lastname)
                await initData(user)
                props.navigation.navigate('homeNavigation', { user })
            }).catch(error => {
                console.log(error);
                if (error.response.status === 400){
                    Alert.alert('Fout inloggegevens', 'De opgegeven inloggegevens zijn niet bekend in ons systeem');
                }
            })
    }

    const initData = async (user) => {
        await AsyncStorage.setItem('userId', user._id)
        await initOrg()
        initDateParser(tr.locale)
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.view}>
                <Logo width={ss.width / 10 * 7} style={styles.logo} />
                <View style={styles.emailField}>
                    <Mail style={styles.svg} stroke={'#A0A3BD'}/>
                    <TextInput style={styles.input} onChangeText={onChangeName} value={username} placeholder={tr.login?.login.email} keyboardType={'email-address'} />
                </View>
                <View style={styles.emailField}>
                    <Lock style={styles.svg} stroke={'#A0A3BD'}/>
                    <TextInput style={styles.input} onChangeText={onChangePass} secureTextEntry={true} value={pass} placeholder={tr.login?.login.password} />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => { loginUser(username, pass); }}><Text style={styles.text}>Login</Text></TouchableOpacity>
                <TouchableOpacity style={styles.passForgotBtn} onPress={() => props.navigation.navigate('login_forget')}><Text style={styles.passForgot}>{tr.login?.login.forgotPassword}</Text></TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

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
        marginBottom: Dimensions.get('window').height / 30,
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
