import React from "react";
import { connect } from "react-redux";
import { ApolloConsumer } from "react-apollo";
import { Text, View, Button, AsyncStorage } from "react-native";
import { styles } from "../styles/styles";
import { AppState } from "../../App";
import { CounterState } from "../reducers/types";
import { add, substract } from "../reducers/action";
import { MeComponent } from "../generated/apolloComponents";
import { NavigationScreenProps } from "react-navigation";

interface Props {}
class Home extends React.PureComponent<Props & NavigationScreenProps> {
   handleLogout = async (client: any) => {
      await AsyncStorage.removeItem("userId");
      this.props.navigation.navigate("Login");
      client.resetStore();
   };
   render() {
      return (
         <MeComponent>
            {({ data }) => {
               if (!data) {
                  return null;
               }
               if (data.me) {
                  console.log(data.me);
               }
               return (
                  <View style={styles.container}>
                     <Text>Home</Text>
                  </View>
               );
            }}
         </MeComponent>
      );
   }
}

export default Home;
