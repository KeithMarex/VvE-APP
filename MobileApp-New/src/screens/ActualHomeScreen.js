import React from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import StyledText from '../components/StyledText'

const window = Dimensions.get('window');

const HomeScreen = (props) => {
    return (
        // <View style={styles.view}>
        //     <Image style={styles.logo} source={require('../resources/images/de-nieuwe-wereld-logo.png')} resizeMode="contain" />
        //     <TextInput style={styles.input} onChangeText={onChangeName} value={username} placeholder="Email" />
        //     <TextInput style={styles.input} onChangeText={onChangePass} value={pass} placeholder="Password" />
        //     <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Component')}><Text style={styles.text}>Login</Text></TouchableOpacity>
        //     <TouchableOpacity style={styles.passForgotBtn} onPress={() => props.navigation.navigate('List')}><Text style={styles.passForgot}>Wachtwoord vergeten?</Text></TouchableOpacity>
        // </View>
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.home}>
                    <Image style={styles.logo} source={require('../resources/images/de-nieuwe-wereld-logo.png')} resizeMode="contain" />
                    <View style={styles.intro}>
                        <StyledText inputStyle={styles.introWelcome}>Welkom</StyledText>
                        <StyledText inputStyle={styles.introName}>Hicham Ben Yessef</StyledText>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
    },
    root: {
        backgroundColor: '#F7F7FC',
        height: '100%'
    },
    scrollView: {
        width: '100%'
    },
    home: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 100,
        paddingBottom: 100
    },
    logo: {
        width: window.width / 10 * 7,
        height: window.height / 4
    },

    intro: {
        backgroundColor: '#FCFCFC',
        borderRadius: 60,
        paddingTop: 21,
        paddingBottom: 25
    },
    introWelcome: {
        fontSize: 30
    },
    introName: {

    },

});

export default HomeScreen;
