import * as React from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Mutation } from "react-apollo";
import { styles } from "../styles/styles";
import { NavigationScreenProps } from "react-navigation";
import { gql } from "apollo-boost";

const LOGIN_MUTATION = gql`
   mutation Login {
      login(email: "buster@gmail.com", password: "password") {
         id
         name
         email
      }
   }
`;
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

      return (
         <Mutation mutation={LOGIN_MUTATION}>
            {(mutate: any) => (
               <View style={styles.container}>
                  <Text>Login</Text>
                  <TextInput
                     style={styles.border}
                     value={email}
                     onChangeText={(value: string) =>
                        this.setState({ email: value })
                     }
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
                     onPress={async () => {
                        const response = await mutate();
                        console.log(response);
                     }}
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
            )}
         </Mutation>
      );
   }
}

export default Login;
