import * as React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../styles/styles";
import { NavigationScreenProps } from "react-navigation";

interface Props extends NavigationScreenProps {}

export interface SignupState {
   email: string;
   password: string;
}

class Signup extends React.PureComponent<Props, SignupState> {
   static navigationOptions = {
      title: "Signup"
   };
   state: SignupState = {
      email: "",
      password: ""
   };

   render() {
      const { email, password } = this.state;
      console.log(this.props.navigation);
      return (
         <View>
            <Text>Login</Text>
            <TextInput
               value={email}
               onChangeText={(value: string) => this.setState({ email: value })}
               placeholder="Email"
            />
            <TextInput
               value={password}
               onChangeText={(value: string) =>
                  this.setState({ password: value })
               }
               placeholder="Password"
               secureTextEntry
            />
            <Button
               title="Login"
               onPress={() => this.props.navigation.navigate("Home")}
            />
            <Button
               title="Signup"
               onPress={() => this.props.navigation.navigate("Signup")}
            />
         </View>
      );
   }
}

export default Signup;
