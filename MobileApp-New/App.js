import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ComponentsScreen from './src/screens/ComponentsScreen';
import Login_forget from "./src/screens/login_forget";
import ActualHomeScreen from "./src/screens/ActualHomeScreen";

const navigator = createStackNavigator(
  {
    Login: { screen: HomeScreen, navigationOptions: { headerShown: false }},
    Home: { screen: ActualHomeScreen, navigationOptions: { headerShown: false }},
    Component: ComponentsScreen,
    login_forget: { screen: Login_forget, navigationOptions: { headerShown: false }}
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
