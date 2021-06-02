// Functional import statements
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

// Component imports
import ActualHomeScreen from "../../screens/home/HomeScreen";
import React from "react";

// Icons
import { HomeIcon, CalendarIcon, NewsIcon, NotificationIcon, ProfileIcon } from "../../resources"

import {Dimensions, StyleSheet, View} from "react-native";
import Profile from "../../screens/profile/Profile";
import News from "../../screens/news/News";
import Calendar from "../../screens/calendar/CalendarScreen";
import TicketNavigation from "./tabsNavigation/ticket/TicketNavigation";

const Tab = createBottomTabNavigator();
const ss = Dimensions.get('window');

const HomeNavigation = (props) => {
    return (
        <View style={styles.root}>
            <NavigationContainer>
                <Tab.Navigator tabBarOptions={{style: styles.navBar, showLabel: false, keyboardHidesTabBar: true}}>
                    <Tab.Screen name="Home" component={ActualHomeScreen} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <HomeIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} stroke={'#FCFCFC'} />
                        },
                        user: props.user
                    }} />
                    <Tab.Screen name="Agenda" component={Calendar} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <CalendarIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} stroke={isFocused ? '#451864' : '#FCFCFC'} />
                        },
                    }} />
                    <Tab.Screen name="Nieuws" component={News} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <NewsIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} stroke={isFocused ? '#451864' : '#FCFCFC'} />
                        },
                    }} />
                    <Tab.Screen name="Meldingen" component={TicketNavigation} options={{
                        headerShown: false,
                        headerLeft: ()=> null,
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <NotificationIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} stroke={'#FCFCFC'} />
                        },
                    }} />
                    <Tab.Screen name="Account" component={Profile} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <ProfileIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} stroke={'#FCFCFC'} />
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
    navBar: {
        backgroundColor: '#451864',
        height: ss.height / 12,
        borderTopWidth: 0
    }
});

export default HomeNavigation;
