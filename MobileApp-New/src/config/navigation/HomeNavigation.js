// Functional import statements
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

// Component imports
import ActualHomeScreen from "../../screens/home/HomeScreen";
import React, { useEffect, useState } from 'react'

// Icons
import { HomeIcon, CalendarIcon, NewsIcon, NotificationIcon, ProfileIcon } from "../../resources"

import {Dimensions, StyleSheet, View} from "react-native";
import Profile from "../../screens/profile/Profile";
import Calendar from "../../screens/calendar/CalendarScreen";
import TicketNavigation from "./tabsNavigation/ticket/TicketNavigation";
import { getOrgColors } from '../../util/OrganizationUtil'
import NewsNavigation from "./tabsNavigation/news/NewsNavigation";

const Tab = createBottomTabNavigator();
const ss = Dimensions.get('window');

const HomeNavigation = (props) => {
    const [colors, setColors] = useState({})

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })
    }, [])

    return (
        <View style={styles.root}>
            <NavigationContainer>
                <Tab.Navigator tabBarOptions={{style: [styles.navBar, {backgroundColor: colors?.primarycolor}], showLabel: false, keyboardHidesTabBar: true}}>
                    <Tab.Screen name="Home" component={ActualHomeScreen} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <HomeIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} stroke={'#FCFCFC'} />
                        }
                    }}
                    initialParams={{user: props.navigation.state.params.user}}
                    />
                    <Tab.Screen name="Agenda" component={Calendar} options={{
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <CalendarIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} stroke={isFocused ? colors?.primarycolor : '#FCFCFC'} />
                        },
                    }} />
                    <Tab.Screen name="Nieuws" component={NewsNavigation} options={{
                        headerShown: false,
                        headerLeft: ()=> null,
                        tabBarIcon: () => {
                            const isFocused = useIsFocused()
                            return <NewsIcon opacity={isFocused ? 1 : 0.8} fill={isFocused ? 'white' : 'transparent'} stroke={isFocused ? colors?.primarycolor : '#FCFCFC'} />
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
                    }}
                    initialParams={{user: props.navigation.state.params.user}} />
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
        height: ss.height / 12,
        borderTopWidth: 0
    }
});

export default HomeNavigation;
