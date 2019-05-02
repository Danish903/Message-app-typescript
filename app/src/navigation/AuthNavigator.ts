import { createStackNavigator } from "react-navigation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const AuthNavigator = createStackNavigator({
   Login,
   Signup
});

export default AuthNavigator;
