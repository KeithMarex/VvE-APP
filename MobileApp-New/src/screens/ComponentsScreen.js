import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ComponentsScreen = () => {
    const yourname = "Koen";

    return (
        <View>
            <Text style={styles.TextStyle}>Getting starded with react native!</Text>
            <Text style={styles.TextStyle2}>My name is {yourname}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    TextStyle: {
        fontSize: 45
    },
    TextStyle2: {
        fontSize: 20
    }
});

export default ComponentsScreen;
