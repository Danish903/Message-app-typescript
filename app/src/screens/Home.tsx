import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/styles";

interface Props {}

export default class Home extends React.PureComponent<Props> {
   render() {
      return (
         <View style={styles.container}>
            <Text>Home</Text>
         </View>
      );
   }
}
