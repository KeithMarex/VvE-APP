import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ComponentsScreen from './src/screens/ComponentsScreen';
import Login_forget from "./src/screens/login_forget";
import ActualHomeScreen from "./src/screens/ActualHomeScreen";
import HomeNavigation from "./src/screens/HomeNavigation";
import Profile from "./src/screens/Profile";
import Notification from "./src/screens/Notification";
import Calandar from "./src/screens/Calandar";
import News from "./src/screens/News";

const navigator = createStackNavigator(
  {
    Login: { screen: HomeScreen, navigationOptions: { headerShown: false }},
    Home: { screen: ActualHomeScreen, navigationOptions: { headerShown: false }},
    HomeNavigation: { screen: HomeNavigation, navigationOptions: { headerShown: false }},
    Component: ComponentsScreen,
    login_forget: { screen: Login_forget, navigationOptions: { headerShown: false }},
    profile: { screen: Profile, navigationOptions: { headerShown: false }},
    calandar: { screen: Calandar, navigationOptions: { headerShown: false }},
    nieuws: { screen: News, navigationOptions: { headerShown: false }},
    notificatie: { screen: Profile, Notification: { headerShown: false }}
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
        title: "App",
        headerShown: false
    },
  }
);

export default createAppContainer(navigator);
