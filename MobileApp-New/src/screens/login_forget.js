import React from "react";
import {View, Text, StyleSheet, FlatList, Dimensions, Image, TextInput, TouchableOpacity} from "react-native";

const ss = Dimensions.get('window');

const Login_forget = () => {
    const friends = [
        { name: "Friends 1", age: '10'},
        { name: "Friends 2", age: '20'},
        { name: "Friends 3", age: '45'},
        { name: "Friends 4", age: '32'},
        { name: "Friends 5", age: '27'},
        { name: "Friends 6", age: '53'},
        { name: "Friends 7", age: '30'},
    ]

    const [username, onChangeName] = React.useState("");
    const [pass, onChangePass] = React.useState("");

    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../resources/images/de-nieuwe-wereld-logo.png')} resizeMode="contain" />
            <Text>Wachtwoord herstellen</Text>
            <TextInput style={styles.input} onChangeText={onChangeName} value={username} placeholder="Email" />
            <Text>Er wordt een nieuw wachtwoord naar uw mail adres gestuurd.</Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Component')}><Text style={styles.text}>Wachtwoord herstellen</Text></TouchableOpacity>
            <TouchableOpacity style={styles.passForgotBtn} onPress={() => props.navigation.navigate('login_forget')}><Text style={styles.passForgot}>Terug naar login</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
        height: Dimensions.get('window').height / 4
    },
    input: {
        backgroundColor: '#EFF0F7',
        width: Dimensions.get('window').width / 10 * 7,
        height: Dimensions.get('window').height / 30 * 2,
        borderRadius: 10,
        marginBottom: Dimensions.get('window').height / 30 * 1,
        paddingLeft: ss.height / 25
    },
    loginButton: {
        backgroundColor: '#A0CAE8',
        width: Dimensions.get('window').width / 10 * 7,
        height: Dimensions.get('window').height / 30 * 2,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Login_forget;
