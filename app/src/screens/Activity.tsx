import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
interface Props {}

const Activity: React.FC<Props> = () => {
   return (
      <View style={styles.container}>
         <Text> Activity </Text>
      </View>
   );
};

export default Activity;
