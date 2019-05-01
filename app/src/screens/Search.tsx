import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";
interface Props {}

const Search: React.FC<Props> = () => {
   return (
      <View style={styles.container}>
         <Text> Search </Text>
      </View>
   );
};

export default Search;
