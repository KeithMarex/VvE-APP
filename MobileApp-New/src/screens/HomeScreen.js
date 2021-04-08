import React from "react";
import { Text, StyleSheet, View, Button, Image, Dimensions, TextInput, TouchableOpacity } from "react-native";

const ss = Dimensions.get('window');

const HomeScreen = (props) => {
    const [username, onChangeName] = React.useState("");
    const [pass, onChangePass] = React.useState("");

    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../resources/images/de-nieuwe-wereld-logo.png')} resizeMode="contain" />
            <TextInput style={styles.input} onChangeText={onChangeName} value={username} placeholder="Email" />
            <TextInput style={styles.input} onChangeText={onChangePass} value={pass} placeholder="Password" />
            <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Component')}><Text style={styles.text}>Login</Text></TouchableOpacity>
            <TouchableOpacity style={styles.passForgotBtn} onPress={() => props.navigation.navigate('List')}><Text style={styles.passForgot}>Wachtwoord vergeten?</Text></TouchableOpacity>
        </View>
    );
};

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

export default HomeScreen;
