import * as React from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import { NavigationScreenProps } from "react-navigation";

interface Props extends NavigationScreenProps {}

export interface LoginState {
   email: string;
   password: string;
}

class Login extends React.PureComponent<Props, LoginState> {
   static navigationOptions = {
      title: "Please Log in"
   };
   state: LoginState = {
      email: "",
      password: ""
   };

   render() {
      const { email, password } = this.state;
      console.log(this.props.navigation);
      return (
         <View style={styles.container}>
            <Text>Login</Text>
            <TextInput
               style={styles.border}
               value={email}
               onChangeText={(value: string) => this.setState({ email: value })}
               placeholder="Email"
            />
            <TextInput
               style={styles.border}
               value={password}
               onChangeText={(value: string) =>
                  this.setState({ password: value })
               }
               placeholder="Password"
               secureTextEntry
            />
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate("Home")}
               style={styles.button}
            >
               <Text>Login</Text>
            </TouchableOpacity>
            <Text> OR </Text>
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate("Signup")}
            >
               <Text>Signup</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

export default Login;
