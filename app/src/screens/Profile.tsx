import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
interface Props {}

const Profile: React.FC<Props> = () => {
   return (
      <View style={styles.container}>
         <Text> Profile </Text>
      </View>
   );
};

export default Profile;
