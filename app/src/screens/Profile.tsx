import * as React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../styles/styles";
import { MeComponent } from "../generated/apolloComponents";
interface Props {}

const Profile: React.FC<Props> = () => {
   return (
      <MeComponent>
         {({ data, loading }) => {
            if (!data && loading) return null;

            return (
               <View style={styles.container}>
                  <Text> Profile </Text>
                  <Image
                     source={{
                        uri: data!.me!.photo
                           ? data!.me!.photo
                           : "https://facebook.github.io/react/logo-og.png"
                     }}
                     style={{ width: 50, height: 50 }}
                  />
                  <Text> {data!.me!.id}</Text>
                  <Text> {data!.me!.email} </Text>
                  <Text> {data!.me!.name} </Text>
                  <Text> {data!.me!.bio}</Text>
               </View>
            );
         }}
      </MeComponent>
   );
};

export default Profile;
