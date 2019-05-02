import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/styles";
import { NavigationScreenProps } from "react-navigation";
import {
   RegisterMutationComponent,
   RegisterMutationMutation,
   RegisterMutationMutationVariables
} from "../generated/apolloComponents";
import { MutationFn } from "react-apollo";

interface Props extends NavigationScreenProps {}

export interface SignupState {
   email: string;
   password: string;
   firstName: string;
   lastName: string;
   bio: string;
}
type registerMutationType = MutationFn<
   RegisterMutationMutation,
   RegisterMutationMutationVariables
>;
class Signup extends React.PureComponent<Props, SignupState> {
   static navigationOptions = {
      title: "Signup"
   };
   state: SignupState = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      bio: ""
   };
   handleSignup = async (register: registerMutationType) => {
      const { email, password, firstName, lastName, bio } = this.state;
      try {
         const res = await register({
            variables: {
               data: { email, password, firstName, lastName, bio }
            }
         });
      } catch (error) {
         console.log(error);
         Alert.alert("Signup failed", "Ooops! something went wrong signing up");
      }
   };
   render() {
      const { email, password, firstName, lastName, bio } = this.state;

      return (
         <RegisterMutationComponent>
            {register => (
               <View style={styles.container}>
                  <Text>Sign up</Text>
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

                  <TextInput
                     style={styles.border}
                     value={firstName}
                     onChangeText={(value: string) =>
                        this.setState({ firstName: value })
                     }
                     placeholder="First name"
                  />
                  <TextInput
                     style={styles.border}
                     value={lastName}
                     onChangeText={(value: string) =>
                        this.setState({ lastName: value })
                     }
                     placeholder="Last name"
                  />
                  <TextInput
                     style={styles.border}
                     value={bio}
                     onChangeText={(value: string) =>
                        this.setState({ bio: value })
                     }
                     placeholder="Bio"
                  />
                  <TouchableOpacity
                     onPress={() => this.handleSignup(register)}
                     style={styles.button}
                  >
                     <Text>Signup</Text>
                  </TouchableOpacity>
               </View>
            )}
         </RegisterMutationComponent>
      );
   }
}

export default Signup;
