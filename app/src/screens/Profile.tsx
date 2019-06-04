import * as React from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { styles } from '../styles/styles';
import {
  MeComponent,
  MeQuery,
  MeQueryVariables
} from '../generated/apolloComponents';
import { NavigationScreenProps } from 'react-navigation';
import { graphql } from 'react-apollo';
import { ME_QUERY } from '../graphql/user/qureries/me';
interface Props {}

class Profile extends React.PureComponent<
  Props & NavigationScreenProps & MeQuery & MeQueryVariables
> {
  handleLogout = async (client: any) => {
    await AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Login');
    client.resetStore();
  };

  componentWillUnmount() {
    console.log('componnent unmount');
  }
  render() {
    return (
      <MeComponent>
        {({ client, data, loading }) => {
          if (!data && !data!.me) return <Text>You are not authenticated</Text>;
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
                    : 'https://facebook.github.io/react/logo-og.png'
                }}
                style={{ width: 50, height: 50 }}
              />
              <Text> {me.email} </Text>
              <Text> {me.name} </Text>
              <Text> {me.bio}</Text>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('EditProfile', {
                    title: 'Edit Profile ',
                    firstName: me.firstName,
                    lastName: me.lastName,
                    bio: me.bio,
                    photo: me.photo
                  })
                }
                style={styles.button}
              >
                <Text>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleLogout(client)}
                style={styles.button}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </MeComponent>
    );
  }
}

export default graphql<any, MeQuery, MeQueryVariables>(ME_QUERY)(Profile);
