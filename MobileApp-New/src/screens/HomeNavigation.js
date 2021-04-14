// Functional import statements
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Component imports
import ActualHomeScreen from "./HomeScreen";
import login_forget from './login_forget';
import React from "react";

// Icons
import HomeIcon from "../resources/icons/navigation/Home.svg";
import CalandarIcon from "../resources/icons/navigation/Calandar.svg";
import NewsIcon from "../resources/icons/navigation/News.svg";
import NotificationIcon from "../resources/icons/navigation/Notification.svg";
import ProfileIcon from "../resources/icons/navigation/Profile.svg";


import {Dimensions, StyleSheet, View} from "react-native";
import Profile from "./Profile";
import Notification from "./Notification";
import News from "./News";
import Calandar from "./Calandar";

const Tab = createBottomTabNavigator();
const ss = Dimensions.get('window');


const HomeNavigation = () => {
    return (
        <View style={styles.root}>
            <NavigationContainer>
                <Tab.Navigator tabBarOptions={{activeTintColor: '#fff', inactiveTintColor: '#000', style: {backgroundColor: '#451864'}, showLabel: false,}}>
                    <Tab.Screen name="Home" component={ActualHomeScreen} options={{
                        tabBarIcon: () => (
                            <HomeIcon/>
                        ),
                    }} />
                    <Tab.Screen name="Agenda" component={Calandar} options={{
                        tabBarIcon: () => (
                            <CalandarIcon/>
                        ),
                    }} />
                    <Tab.Screen name="Nieuws" component={News} options={{
                        tabBarIcon: () => (
                            <NewsIcon/>
                        ),
                    }} />
                    <Tab.Screen name="Meldingen" component={Notification} options={{
                        tabBarIcon: () => (
                            <NotificationIcon/>
                        ),
                    }} />
                    <Tab.Screen name="Account" component={Profile} options={{
                        tabBarIcon: () => (
                            <ProfileIcon/>
                        ),
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
