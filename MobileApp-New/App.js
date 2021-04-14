import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import ComponentsScreen from './src/screens/ComponentsScreen';
import Login_forget from "./src/screens/login_forget";
import HomeScreen from "./src/screens/HomeScreen";
import HomeNavigation from "./src/screens/HomeNavigation";
import Profile from "./src/screens/Profile";
import Notification from "./src/screens/Notification";
import Calandar from "./src/screens/Calandar";
import News from "./src/screens/News";

const navigator = createStackNavigator(
  {
    Login: { screen: LoginScreen, navigationOptions: { headerShown: false }},
    Home: { screen: HomeScreen, navigationOptions: { headerShown: false }},
    HomeNavigation: { screen: HomeNavigation, navigationOptions: { headerShown: false }},
    Component: ComponentsScreen,
    login_forget: { screen: Login_forget, navigationOptions: { headerShown: false }},
    profile: { screen: Profile, navigationOptions: { headerShown: false }},
    calandar: { screen: Calandar, navigationOptions: { headerShown: false }},
    nieuws: { screen: News, navigationOptions: { headerShown: false }},
    notificatie: { screen: Profile, Notification: { headerShown: false }}
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
        title: "App",
        headerShown: false
    },
  }
);

export default createAppContainer(navigator);
