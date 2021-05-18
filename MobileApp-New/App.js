import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import LoginForgot from "./src/screens/LoginForgot";
import HomeNavigation from "./src/screens/HomeNavigation";

const navigator = createStackNavigator(
    {
        login: { screen: LoginScreen, navigationOptions: { headerShown: false, headerLeft: ()=> null }},
        homeNavigation: { screen: HomeNavigation, navigationOptions: { headerShown: false }},
        login_forget: { screen: LoginForgot, navigationOptions: { headerShown: false }},
    },
    {
        initialRouteName: "login",
        defaultNavigationOptions: {
            headerShown: false
        },
    }
);

export default createAppContainer(navigator);
