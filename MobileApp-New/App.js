import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ComponentsScreen from './src/screens/ComponentsScreen';
import ListScreen from "./src/screens/ListScreen";
import ActualHomeScreen from "./src/screens/ActualHomeScreen";

const navigator = createStackNavigator(
  {
    Login: HomeScreen,
    Home: ActualHomeScreen,
    Component: ComponentsScreen,
    List: ListScreen
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
