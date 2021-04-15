import {
    StyleSheet,
    Keyboard,
    View,
    ScrollView,
    TouchableWithoutFeedback, Dimensions
} from "react-native";
import React from "react";
import Logo from '../resources/icons/logo/Logo nieuwe wereld.svg';

const ss = Dimensions.get('window');

const Profile = () => {
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <ScrollView style={styles.view}>
                <View style={styles.home}>
                    <Logo width={'50%'}/>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    view: {
        width: '100%',
        backgroundColor: '#F7F7FC',
    },
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Profile;
