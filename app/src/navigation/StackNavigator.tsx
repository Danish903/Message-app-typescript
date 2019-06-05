import * as React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Activity from '../screens/Activity';
import Upload from '../screens/Upload';
import Profile from '../screens/Profile';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Camera from '../screens/Camera';
import { NavigationScreenProps } from 'react-navigation';
import Map from '../screens/Map';
import EditProfile from '../screens/EditProfile';
import Comment from '../screens/Comment';

export const CameraAndUploadStackNavigator = createStackNavigator(
  {
    Upload: {
      screen: Upload,
      navigationOptions: ({ navigation }: NavigationScreenProps) => ({
        title: 'Create Post',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons
              style={{ paddingLeft: 10 }}
              name={'ios-arrow-back'}
              size={30}
            />
          </TouchableOpacity>
        )
      })
    },
    Camera: {
      screen: Camera,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Camera'
  }
);
export const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      headerTitle: 'Feed Screen',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('CameraAndUploadScreen')}
        >
          <Ionicons style={{ marginLeft: 10 }} name="ios-camera" size={30} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <Ionicons style={{ marginRight: 10 }} name="ios-send" size={30} />
        </TouchableOpacity>
      )
    })
  },
  Map: {
    screen: Map,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: 'Map',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name={'ios-arrow-back'}
            size={30}
          />
        </TouchableOpacity>
      )
    })
  },
  CameraAndUploadScreen: {
    screen: CameraAndUploadStackNavigator,
    navigationOptions: {
      header: null
    }
  },
  Comment: {
    screen: Comment,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: 'Comments',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name={'ios-arrow-back'}
            size={30}
          />
        </TouchableOpacity>
      )
    })
  }
});

HomeNavigator.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  // let tabBarVisible = true;
  // if (
  //    navigation.state.routes.some(
  //       route => route.routeName === "CameraAndUploadScreen"
  //    )
  // ) {
  //    tabBarVisible = false;
  // }
  const tabBarVisible = !navigation.state.routes.some(
    route =>
      route.routeName === 'CameraAndUploadScreen' ||
      route.routeName === 'Map' ||
      route.routeName === 'Comment'
  );

  return {
    tabBarVisible
  };
};

export const SearchNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search'
    }
  }
});
export const ActivityNavigator = createStackNavigator({
  Activity: {
    screen: Activity,
    navigationOptions: {
      title: 'Activity'
    }
  }
});
export const UploadNavigator = createStackNavigator({
  Upload: {
    screen: Upload,
    navigationOptions: {
      title: 'Upload'
    }
  }
});
export const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile'
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: 'Edit Profile',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name={'ios-arrow-back'}
            size={30}
          />
        </TouchableOpacity>
      )
    })
  }
});
