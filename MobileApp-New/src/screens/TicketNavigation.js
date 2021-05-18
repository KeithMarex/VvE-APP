// Component imports
import React from "react";

import {createStackNavigator} from "@react-navigation/stack";
import Tickets from "./Tickets";
import TicketCreate from "./TicketCreate";

const Stack = createStackNavigator();

const TicketNavigation = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Ticket" component={Tickets} options={{headerShown: false, headerLeft: ()=> null}}/>
            <Stack.Screen name="Create" component={TicketCreate} options={{headerShown: false, headerLeft: ()=> null}}/>
        </Stack.Navigator>
    );
};

export default TicketNavigation;
