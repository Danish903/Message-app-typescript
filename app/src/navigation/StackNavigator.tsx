import * as React from "react";
import {
   createStackNavigator,
   createAppContainer,
   NavigationStackScreenOptions
} from "react-navigation";

import Home from "../screens/Home";
import Search from "../screens/Search";
import Activity from "../screens/Activity";
import Upload from "../screens/Upload";
import Profile from "../screens/Profile";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Camera from "../screens/Camera";
import { NavigationScreenProps } from "react-navigation";

export const HomeNavigator = createStackNavigator({
   Home: {
      screen: Home,
      navigationOptions: ({ navigation }: NavigationScreenProps) => ({
         headerTitle: "Feed Screen",
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
               <Ionicons
                  style={{ marginLeft: 10 }}
                  name="ios-camera"
                  size={30}
               />
            </TouchableOpacity>
         ),
         headerRight: (
            <TouchableOpacity onPress={() => console.log("pressed")}>
               <Ionicons
                  style={{ marginRight: 10 }}
                  name="ios-send"
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
});

HomeNavigator.navigationOptions = ({ navigation }: NavigationScreenProps) => {
   let tabBarVisible = true;
   if (navigation.state.routes.some(route => route.routeName === "Camera")) {
      tabBarVisible = false;
   }
   return {
      tabBarVisible
   };
};

export const SearchNavigator = createStackNavigator({
   Search: {
      screen: Search,
      navigationOptions: {
         title: "Search"
      }
   }
});
export const ActivityNavigator = createStackNavigator({
   Activity: {
      screen: Activity,
      navigationOptions: {
         title: "Activity"
      }
   }
});
export const UploadNavigator = createStackNavigator({
   Upload: {
      screen: Upload,
      navigationOptions: {
         title: "Upload"
      }
   }
});
export const ProfileNavigator = createStackNavigator({
   Profile: {
      screen: Profile,
      navigationOptions: {
         title: "Profile"
      }
   }
});
