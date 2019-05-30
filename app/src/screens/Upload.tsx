import * as React from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  SafeAreaView
} from 'react-native';
import { styles } from '../styles/styles';
import { NavigationScreenProps } from 'react-navigation';
import {
  CreatePostComponent,
  CreatePostMutation,
  CreatePostMutationVariables
} from '../generated/apolloComponents';
import { MutationFn } from 'react-apollo';
import { POSTS_QUERY } from '../graphql/post/queries/posts';

interface Props {}
interface State {
  description: string;
  showModal: boolean;
  city: string;
}
type createPostMutationType = MutationFn<
  CreatePostMutation,
  CreatePostMutationVariables
>;
class Upload extends React.PureComponent<Props & NavigationScreenProps, State> {
  state: State = {
    description: '',
    city: '',
    showModal: false
  };

  handleCreatePost = async (createPost: createPostMutationType) => {
    const { navigation } = this.props;
    const photoUrl = navigation.getParam('photoURL');
    const { description, city } = this.state;
    await createPost({
      variables: {
        data: {
          photoUrl,
          description,
          city
        }
      }
    });
    this.props.navigation.navigate('Home');
  };
  modal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.showModal}
      >
        <SafeAreaView>
          <TouchableOpacity
            style={styles.border}
            onPress={() => this.setState({ showModal: false })}
          >
            <Text>San francisco</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };
  render() {
    const { description, city } = this.state;

    const { navigation } = this.props;
    const photoURL = navigation.getParam('photoURL');

    return (
      <CreatePostComponent refetchQueries={[{ query: POSTS_QUERY }]}>
        {createPost => (
          <View style={styles.container}>
            {this.modal()}
            <Image
              style={styles.postPhoto}
              source={{
                uri: !photoURL
                  ? 'https://facebook.github.io/react/logo-og.png'
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

            <TextInput
              style={styles.border}
              value={city}
              onChangeText={(value: string) => this.setState({ city: value })}
              placeholder="City"
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
