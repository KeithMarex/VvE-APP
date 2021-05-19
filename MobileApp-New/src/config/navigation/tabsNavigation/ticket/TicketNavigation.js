// Component imports
import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import Tickets from '../../../../screens/ticket/Tickets'
import TicketCreate from '../../../../screens/ticket/TicketCreate'
import TicketDetails from '../../../../screens/ticket/TicketDetails'

const Stack = createStackNavigator();

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
