import React from "react";

import {
   Text,
   View,
   AsyncStorage,
   ActivityIndicator,
   Image,
   ShadowPropTypesIOS,
   Button,
   Alert
} from "react-native";
import { styles } from "../styles/styles";

import { PostsQueryComponent } from "../generated/apolloComponents";
import { NavigationScreenProps } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const userImage =
   "https://www.thesun.co.uk/wp-content/uploads/2017/08/nintchdbpict000228849890.jpg?strip=all&w=456&quality=100";
const ImageURL =
   "https://images.unsplash.com/photo-1550007488-acbcd2b1be4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";

interface Props {}

class Home extends React.PureComponent<Props & NavigationScreenProps> {
   static navigationOptions = {
      headerTitle: "Home",
      headerRight: (
         <Button
            onPress={() => Alert.alert("This is a button!")}
            title="Info"
            color="#fff"
         />
      )
   };
   render() {
      return (
         <PostsQueryComponent>
            {({ data, loading }) => {
               if (loading) return <ActivityIndicator />;

               return (
                  <View style={styles.container}>
                     <FlatList
                        data={data!.posts}
                        keyExtractor={post => post.id}
                        renderItem={({ item: post }) => (
                           <View>
                              <View style={[styles.row, styles.center]}>
                                 <View style={[styles.row, styles.center]}>
                                    <Image
                                       source={{
                                          uri: userImage
                                       }}
                                       style={styles.roundImage}
                                    />
                                    <Text>{post.owner.firstName}</Text>
                                 </View>

                                 <Ionicons
                                    name="ios-flag"
                                    size={25}
                                    style={{ padding: 5 }}
                                 />
                              </View>

                              <Image
                                 source={{
                                    uri: post.photoUrl
                                       ? post.photoUrl
                                       : ImageURL
                                 }}
                                 style={styles.postPhoto}
                              />
                              <View style={[styles.row]}>
                                 <Ionicons
                                    name="ios-heart-empty"
                                    size={25}
                                    style={{ padding: 5 }}
                                 />
                                 <Ionicons
                                    name="ios-chatbubbles"
                                    size={25}
                                    style={{ padding: 5 }}
                                 />
                                 <Ionicons
                                    name="ios-send"
                                    size={25}
                                    style={{ padding: 5 }}
                                 />
                              </View>
                              <Text>{post.description}</Text>
                           </View>
                        )}
                     />
                  </View>
               );
            }}
         </PostsQueryComponent>
      );
   }
}

export default Home;
