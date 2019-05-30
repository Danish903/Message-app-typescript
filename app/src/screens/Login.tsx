import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';

import { graphql } from 'react-apollo';
import { styles } from '../styles/styles';
import { NavigationScreenProps } from 'react-navigation';

import {
  LoginComponent,
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
  MeComponent,
  MeQueryVariables
} from '../generated/apolloComponents';
import { MutationFn } from 'react-apollo';
import User from '../components/User';
import { ME_QUERY } from '../graphql/user/qureries/me';

interface Props extends NavigationScreenProps {
  data: MeQuery | undefined;
}

export interface LoginState {
  email: string;
  password: string;
}
type LoginMutationType = MutationFn<LoginMutation, LoginMutationVariables>;
class Login extends React.PureComponent<Props, LoginState> {
  state: LoginState = {
    email: '',
    password: ''
  };
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('token');
    if (!!userId) {
      this.props.navigation.navigate('Home');
    }
  }

  handleLogin = async (login: LoginMutationType) => {
    const { email, password } = this.state;
    const response = await login({
      variables: {
        email,
        password
      }
    });
    if (
      response &&
      response.data &&
      response.data.login &&
      response.data.login.token
    ) {
      await AsyncStorage.setItem('token', response.data.login.token);
      this.props.navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', 'Invalid login!');
    }
  };
  render() {
    const { email, password } = this.state;

    return (
      <LoginComponent>
        {login => (
          <View style={styles.container}>
            <Text>Login</Text>
            <TextInput
              style={styles.border}
              value={email}
              onChangeText={(value: string) => this.setState({ email: value })}
              placeholder="Email"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.border}
              value={password}
              onChangeText={(value: string) =>
                this.setState({ password: value })
              }
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity
              onPress={async () => {
                this.handleLogin(login);
              }}
              style={styles.button}
            >
              <Text>Login</Text>
            </TouchableOpacity>
            <Text> OR </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}
            >
              <Text>Signup</Text>
            </TouchableOpacity>
          </View>
        )}
      </LoginComponent>
    );
  }
}

export default graphql<any, Props>(ME_QUERY, {})(Login);
