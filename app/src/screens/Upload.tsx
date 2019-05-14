import * as React from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/styles";
import { NavigationScreenProps } from "react-navigation";
import {
   CreatePostComponent,
   CreatePostMutation,
   CreatePostMutationVariables
} from "../generated/apolloComponents";
import { MutationFn } from "react-apollo";
import { POSTS_QUERY } from "../graphql/post/queries/posts";

interface Props {}
interface State {
   description: string;
}
type createPostMutationType = MutationFn<
   CreatePostMutation,
   CreatePostMutationVariables
>;
class Upload extends React.PureComponent<Props & NavigationScreenProps, State> {
   state: State = {
      description: ""
   };

   handleCreatePost = async (createPost: createPostMutationType) => {
      const { navigation } = this.props;
      const photoUrl = navigation.getParam("photoURL");
      const { description } = this.state;
      await createPost({
         variables: {
            data: {
               photoUrl,
               description
            }
         }
      });
      this.props.navigation.navigate("Home");
   };
   render() {
      const { description } = this.state;

      const { navigation } = this.props;
      const photoURL = navigation.getParam("photoURL");

      return (
         <CreatePostComponent refetchQueries={[{ query: POSTS_QUERY }]}>
            {createPost => (
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
                     onPress={() => this.handleCreatePost(createPost)}
                  >
                     <Text>Post</Text>
                  </TouchableOpacity>
               </View>
            )}
         </CreatePostComponent>
      );
   }
}

export default Upload;
