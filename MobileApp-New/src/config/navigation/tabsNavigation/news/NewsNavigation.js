// Component imports
import React from 'react'

// Screen imports + Navigator
import {createStackNavigator} from "@react-navigation/stack";
import News from "../../../../screens/news/News";
import NewsExpanded from "../../../../screens/news/NewsExpanded";

const Stack = createStackNavigator();

// Describe screens with navigation name which only can be used in the following navigator
// Copy the options from other screens to make sure the header bar won't be shown
const NewsNavigation = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="List" component={News} options={{headerShown: false, headerLeft: ()=> null}}/>
            <Stack.Screen name="detail" component={NewsExpanded} options={{headerShown: false, headerLeft: ()=> null}}/>
        </Stack.Navigator>
    );
};

export default NewsNavigation;
