// Component imports
import React from 'react'

// Screen imports + Navigator
import {createStackNavigator} from "@react-navigation/stack";
import Tickets from "../../../../screens/ticket/Tickets";
import TicketCreate from "../../../../screens/ticket/TicketCreate";
import TicketDetails from '../../../../screens/ticket/TicketDetails'

const Stack = createStackNavigator();

// Describe screens with navigation name which only can be used in the following navigator
// Copy the options from other screens to make sure the header bar won't be shown
const TicketNavigation = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tickets" component={Tickets} options={{headerShown: false, headerLeft: ()=> null}}/>
            <Stack.Screen name="Create" component={TicketCreate} options={{headerShown: false, headerLeft: ()=> null}}/>
            <Stack.Screen name="Details" component={TicketDetails} options={{headerShown: false, headerLeft: ()=> null}}/>
        </Stack.Navigator>
    );
};

export default TicketNavigation;
