import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
interface Props {}

const Upload: React.FC<Props> = () => {
   return (
      <View style={styles.container}>
         <Text> Upload </Text>
      </View>
   );
};

export default Upload;
