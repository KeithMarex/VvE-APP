import React from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";

const ListScreen = () => {
    const friends = [
        { name: "Friends 1", age: '10'},
        { name: "Friends 2", age: '20'},
        { name: "Friends 3", age: '45'},
        { name: "Friends 4", age: '32'},
        { name: "Friends 5", age: '27'},
        { name: "Friends 6", age: '53'},
        { name: "Friends 7", age: '30'},
    ]
    
    return (
        <View>
            <FlatList showHorizontalScrollIndicator={false} keyExtractor={(friend) => friend.name} data={friends} renderItem={({item}) => {
                return <Text>{item.name} is {item.age} jaar oud</Text>
            }} />
        </View>
    );
}

const styles = StyleSheet.create({});

export default ListScreen;
