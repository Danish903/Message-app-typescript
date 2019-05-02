import React from "react";
import { connect } from "react-redux";
import { Text, View, Button } from "react-native";
import { styles } from "../styles/styles";
import { AppState } from "../../App";
import { CounterState } from "../reducers/types";
import { add, substract } from "../reducers/action";

interface Props {
   count: CounterState;
   add: typeof add;
   substract: typeof substract;
}
class Home extends React.PureComponent<Props> {
   render() {
      const {
         count: { count }
      } = this.props;
      return (
         <View style={styles.container}>
            <Text>Home: {count}</Text>
            <Button title="+" onPress={() => this.props.add()} />
            <Button title="-" onPress={() => this.props.substract()} />
         </View>
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
