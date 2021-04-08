import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = (props) => {
  console.log(props.navigation);

  return (
      <View>
        <Text style={styles.text}>Hi there!</Text>
        <Button title="Go to ComponentsScreen!" onPress={() => props.navigation.navigate('Component')}/>
        <Button title="Go to list!" onPress={() => props.navigation.navigate('List')}/>
      </View>
    );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;
