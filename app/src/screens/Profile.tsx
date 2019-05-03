import * as React from "react";
import {
   View,
   Text,
   Image,
   AsyncStorage,
   TouchableOpacity
} from "react-native";
import { styles } from "../styles/styles";
import { MeComponent } from "../generated/apolloComponents";
import { NavigationScreenProps } from "react-navigation";
interface Props {}

const Profile: React.FC<Props & NavigationScreenProps> = props => {
   const handleLogout = async (client: any) => {
      await AsyncStorage.removeItem("userId");
      props.navigation.navigate("Login");
      client.resetStore();
   };
   return (
      <MeComponent>
         {({ client, data, loading }) => {
            if (!data && loading) return null;
            let me: any = {};
            if (data && data.me) {
               me = data.me;
            }
            return (
               <View style={styles.container}>
                  <Text> Profile </Text>
                  <Image
                     source={{
                        uri: me.photo
                           ? me.photo
                           : "https://facebook.github.io/react/logo-og.png"
                     }}
                     style={{ width: 50, height: 50 }}
                  />
                  <Text> {me.id}</Text>
                  <Text> {me.email} </Text>
                  <Text> {me.name} </Text>
                  <Text> {me.bio}</Text>
                  <TouchableOpacity
                     onPress={() => handleLogout(client)}
                     style={styles.button}
                  >
                     <Text>Logout</Text>
                  </TouchableOpacity>
               </View>
            );
         }}
      </MeComponent>
   );
};

export default Profile;
