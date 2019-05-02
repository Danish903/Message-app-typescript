import React from "react";
import { connect } from "react-redux";
import { Text, View, Button, AsyncStorage } from "react-native";
import { styles } from "../styles/styles";
import { AppState } from "../../App";
import { CounterState } from "../reducers/types";
import { add, substract } from "../reducers/action";
import { MeComponent } from "../generated/apolloComponents";
import { NavigationScreenProps } from "react-navigation";

interface Props {
   count: CounterState;
   add: typeof add;
   substract: typeof substract;
}
class Home extends React.PureComponent<Props & NavigationScreenProps> {
   handleLogout = async () => {
      await AsyncStorage.removeItem("userId");
      this.props.navigation.navigate("Login");
   };
   render() {
      const {
         count: { count }
      } = this.props;
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
                     <Text>Home: {count}</Text>
                     <Button title="+" onPress={() => this.props.add()} />
                     <Button title="-" onPress={() => this.props.substract()} />
                     <Button
                        title="Logout"
                        onPress={() => this.handleLogout()}
                     />
                  </View>
               );
            }}
         </MeComponent>
      );
   }
}

const mapStateToProps = (state: AppState) => ({
   count: state.count
});
const actions = {
   add,
   substract
};
export default connect(
   mapStateToProps,
   actions
)(Home);
