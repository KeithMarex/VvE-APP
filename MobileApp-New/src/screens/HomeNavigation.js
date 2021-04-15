// Functional import statements
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationState, useIsFocused } from '@react-navigation/native';

// Component imports
import ActualHomeScreen from "./HomeScreen";
import React from "react";

// Icons
import HomeIcon from "../resources/icons/navigation/Home.svg";
import CalendarIcon from "../resources/icons/navigation/Calandar.svg";
import NewsIcon from "../resources/icons/navigation/News.svg";
import NotificationIcon from "../resources/icons/navigation/Notification.svg";
import ProfileIcon from "../resources/icons/navigation/Profile.svg";

import {Dimensions, StyleSheet, View} from "react-native";
import Profile from "./Profile";
import Notification from "./Notification";
import News from "./News";
import Calendar from "./Calandar";

const Tab = createBottomTabNavigator();
const ss = Dimensions.get('window');


const HomeNavigation = (props) => {


    return (
        <View style={styles.root}>
            <NavigationContainer>
                <Tab.Navigator tabBarOptions={{style: {backgroundColor: '#451864'}, showLabel: false,}}>
                    <Tab.Screen name="Home" component={ActualHomeScreen} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <HomeIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} />
                        },
                    }} />
                    <Tab.Screen name="Agenda" component={Calendar} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <CalendarIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} />
                        },
                    }} />
                    <Tab.Screen name="Nieuws" component={News} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <NewsIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} />
                        },
                    }} />
                    <Tab.Screen name="Meldingen" component={Notification} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <NotificationIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} />
                        },
                    }} />
                    <Tab.Screen name="Account" component={Profile} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <ProfileIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} />
                        },
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        height: '100%'
    },
    bottomNavigation: {
        backgroundColor: '#451864'
    }
});

export default HomeNavigation;
