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
<<<<<<< HEAD
    Login: { screen: LoginScreen, navigationOptions: { headerShown: false }},
    Home: { screen: HomeScreen, navigationOptions: { headerShown: false }},
    HomeNavigation: { screen: HomeNavigation, navigationOptions: { headerShown: false }},
=======
    login: { screen: LoginScreen, navigationOptions: { headerShown: false, headerLeft: ()=> null }},
    home: { screen: HomeScreen, navigationOptions: { headerShown: false, headerLeft: ()=> null }},
    homeNavigation: { screen: HomeNavigation, navigationOptions: { headerShown: false }},
>>>>>>> ceb1e3507ddf9b8f0f81e8083c521c2e10f217f0
    Component: ComponentsScreen,
    login_forget: { screen: Login_forget, navigationOptions: { headerShown: false }},
    profile: { screen: Profile, navigationOptions: { headerShown: false }},
    calandar: { screen: Calandar, navigationOptions: { headerShown: false }},
    news: { screen: News, navigationOptions: { headerShown: false }},
    notificatie: { screen: Notification, navigationOptions: { headerShown: false }}
  },
  {
    initialRouteName: "login",
    defaultNavigationOptions: {
        title: "App",
        headerShown: false
    },
  }
);

export default createAppContainer(navigator);
