import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import StyledText from '../components/StyledText'
import { BoxShadow } from 'react-native-shadow'

const window = Dimensions.get('window')

const HomeScreen = (props) => {
    // const [introHeight, setIntroHeight] = useState(0)

    // console.log(introHeight)

    const shadowOpt = {
        width: window.width - 60,
        height: 10,
        color: "#111111",
        border: 16,
        radius: 10,
        opacity: 0.04,
        x: 0,
        y: 8,
        style: { marginVertical:5 }
    }

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
                    <BoxShadow setting={shadowOpt}>
                        <View style={styles.intro}>
                            <StyledText inputStyle={styles.introWelcome}>Welkom</StyledText>
                            <StyledText inputStyle={styles.introName}>Hicham Ben Yessef</StyledText>
                            <View style={styles.introMessage}>
                                <StyledText inputStyle={styles.introMessageText}>1 nieuwe reactie ></StyledText>
                            </View>
                            <View style={styles.introMessage}>
                                <StyledText inputStyle={[styles.introMessageText, styles.introMessageTextAgenda]}>3 nabije agendapunten ></StyledText>
                            </View>
                        </View>
                    </BoxShadow>
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
        height: '100%',
    },
    // scrollView: {
    //     width: '100%',
    // },
    home: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
        padding: 30
    },
    logo: {
        width: window.width / 10 * 5,
        height: window.height / 6,
        marginBottom: 10
    },

    intro: {
        width: '100%',
        backgroundColor: '#FCFCFC',
        borderRadius: 20,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 21,
        paddingBottom: 25,
        position: 'relative'
    },
    introWelcome: {
        fontSize: 13,
        letterSpacing: 3,
        color: '#14142B',
        textTransform: 'uppercase'
    },
    introName: {
        fontWeight: 'bold',
        fontSize: 28
    },
    introMessage: {
        marginTop: 10
    },
    introMessageText: {
        fontSize: 16,
        fontWeight: '300'
    },
    introMessageTextAgenda: {
        fontSize: 14
    }

});

export default HomeScreen;
