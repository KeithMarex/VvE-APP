import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/login/LoginScreen";
import LoginForgot from "./src/screens/login/LoginForgot";
import HomeNavigation from "./src/config/navigation/HomeNavigation";
require('dotenv').config();

const navigator = createStackNavigator(
    {
        login: { screen: LoginScreen, navigationOptions: { headerShown: false, headerLeft: ()=> null }},
        homeNavigation: { screen: HomeNavigation, navigationOptions: { headerShown: false }},
        login_forget: { screen: LoginForgot, navigationOptions: { headerShown: false }},
    },
    {
        initialRouteName: "homeNavigation",
        defaultNavigationOptions: {
            headerShown: false
        },
    }
);

export default createAppContainer(navigator);
