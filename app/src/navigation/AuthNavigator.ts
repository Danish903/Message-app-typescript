import { createStackNavigator } from "react-navigation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const AuthNavigator = createStackNavigator({
   Login: {
      screen: Login,
      navigationOptions: { header: null }
   },
   Signup: {
      screen: Signup,
      navigationOptions: { header: null }
   }
});

export default AuthNavigator;
