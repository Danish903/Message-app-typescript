import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { styles } from '../styles/styles';
import { NavigationScreenProps } from 'react-navigation';
import {
  EditProfileComponent,
  EditProfileMutation,
  EditProfileMutationVariables,
  MeQuery
} from '../generated/apolloComponents';
import { MutationFn, MutationUpdaterFn } from 'react-apollo';
import { userImage } from './Home';
import { Permissions, ImagePicker } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';
import { ME_QUERY } from '../graphql/user/qureries/me';

interface Props extends NavigationScreenProps {}

export interface SignupState {
  firstName?: string;
  lastName?: string;
  bio?: string;
  profilePicture?: ReactNativeFile;
  photo: string;
}
type editProfileMutationType = MutationFn<
  EditProfileMutation,
  EditProfileMutationVariables
>;
class EditProfile extends React.PureComponent<Props, SignupState> {
  static navigationOptions = {
    title: 'Signup'
  };
  state: SignupState = {
    firstName: '',
    lastName: '',
    bio: '',
    profilePicture: undefined,
    photo: ''
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      firstName: navigation.getParam('firstName'),
      lastName: navigation.getParam('lastName'),
      bio: navigation.getParam('bio'),
      photo: navigation.getParam('photo')
    });
  }
  openCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });
      if (!image.cancelled) {
        const { uri } = image;
        const profilePicture = new ReactNativeFile({
          uri,
          name: 'profilePitcure.png',
          type: 'image/png'
        });
        this.setState({
          profilePicture,
          photo: uri
        });
      }
    }
  };
  handleEditProfile = async (editProfile: editProfileMutationType) => {
    try {
      const { firstName, lastName, bio, profilePicture } = this.state;
      await editProfile({
        variables: {
          data: {
            firstName,
            lastName,
            bio,
            profilePicture
          }
        }
      });

      Alert.alert(
        'Updated',
        'Your profile has been updated!',
        [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    }
  };

  updateCache: MutationUpdaterFn<EditProfileMutation> = (
    cache,
    { data: editProfile }
  ) => {
    const data = cache.readQuery<MeQuery>({
      query: ME_QUERY
    });
    if (!data || !data.me || !editProfile) return;
    data.me = {
      ...data.me,
      ...editProfile.editProfile
    };
    cache.writeQuery<MeQuery>({
      query: ME_QUERY,
      data
    });
  };
  render() {
    const { firstName, lastName, bio, photo } = this.state;

    return (
      <EditProfileComponent update={this.updateCache}>
        {editProfile => (
          <View style={styles.container}>
            <TouchableOpacity onPress={this.openCameraRoll}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={styles.roundImage}
                  source={{ uri: photo ? photo : userImage }}
                />
                <Text>Upload Photo</Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.border}
              value={firstName}
              onChangeText={(value: string) =>
                this.setState({ firstName: value })
              }
              placeholder="First name"
            />
            <TextInput
              style={styles.border}
              value={lastName}
              onChangeText={(value: string) =>
                this.setState({ lastName: value })
              }
              placeholder="Last name"
            />
            <TextInput
              style={styles.border}
              value={bio}
              onChangeText={(value: string) => this.setState({ bio: value })}
              placeholder="Bio"
            />
            <TouchableOpacity
              onPress={() => this.handleEditProfile(editProfile)}
              style={styles.button}
            >
              <Text>Edit and Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </EditProfileComponent>
    );
  }
}

export default EditProfile;
