import * as React from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/styles";

interface Props {}
interface State {
   description: string;
}
class Upload extends React.PureComponent<Props, State> {
   state: State = {
      description: ""
   };
   render() {
      const { description } = this.state;
      return (
         <View style={styles.container}>
            <Image
               style={styles.postPhoto}
               source={{
                  uri: "https://facebook.github.io/react/logo-og.png"
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
               onPress={() => console.log("Posting")}
            >
               <Text>Post</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

export default Upload;
