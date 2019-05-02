import * as React from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import { NavigationScreenProps } from "react-navigation";

interface Props extends NavigationScreenProps {}

export interface SignupState {
   email: string;
   password: string;
   username: string;
   bio: string;
}

class Signup extends React.PureComponent<Props, SignupState> {
   static navigationOptions = {
      title: "Signup"
   };
   state: SignupState = {
      email: "",
      password: "",
      username: "",
      bio: ""
   };

   render() {
      const { email, password, username, bio } = this.state;
      console.log(this.props.navigation);
      return (
         <View style={styles.container}>
            <Text>Sign up</Text>
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

            <TextInput
               style={styles.border}
               value={username}
               onChangeText={(value: string) =>
                  this.setState({ username: value })
               }
               placeholder="Username"
            />
            <TextInput
               style={styles.border}
               value={bio}
               onChangeText={(value: string) => this.setState({ bio: value })}
               placeholder="Bio"
            />
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate("Signup")}
               style={styles.button}
            >
               <Text>Signup</Text>
            </TouchableOpacity>

            <Text> OR </Text>
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate("Home")}
            >
               <Text>Login</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

export default Signup;
