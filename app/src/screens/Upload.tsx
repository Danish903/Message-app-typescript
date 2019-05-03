import * as React from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/styles";
import { NavigationScreenProps } from "react-navigation";

interface Props {}
interface State {
   description: string;
}
class Upload extends React.PureComponent<Props & NavigationScreenProps, State> {
   state: State = {
      description: ""
   };
   render() {
      const { description } = this.state;

      const { navigation } = this.props;
      const photoURL = navigation.getParam("photoURL");

      return (
         <View style={styles.container}>
            <Image
               style={styles.postPhoto}
               source={{
                  uri: !photoURL
                     ? "https://facebook.github.io/react/logo-og.png"
                     : photoURL
               }}
            />
            <TextInput
               style={styles.border}
               value={description}
               onChangeText={(value: string) =>
                  this.setState({ description: value })
               }
               placeholder="Description"
            />

            <TouchableOpacity
               style={styles.button}
               onPress={() => this.props.navigation.navigate("Home")}
            >
               <Text>Post</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

export default Upload;
