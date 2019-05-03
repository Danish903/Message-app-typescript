import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Activity from "../screens/Activity";
import Upload from "../screens/Upload";
import Profile from "../screens/Profile";

const TabNavigator = createBottomTabNavigator(
   {
      Home: {
         screen: Home,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: () => <Ionicons name="ios-home" size={32} />
         }
      },
      Search: {
         screen: Search,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: () => <Ionicons name="ios-search" size={32} />
         }
      },
      Upload: {
         screen: Upload,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: () => <Ionicons name="ios-add" size={32} />
         }
      },
      Activity: {
         screen: Activity,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: ({ focused }: { focused: Boolean }) => {
               const iconName = focused ? "ios-heart" : "ios-heart-empty";
               return <Ionicons name={iconName} size={32} />;
            }
         }
      },
      Profile: {
         screen: Profile,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: ({ focused }: { focused: Boolean }) => {
               const iconName = focused ? "ios-person" : "ios-person";
               return <Ionicons name={iconName} size={32} />;
            }
         }
      }
   },
   {
      tabBarOptions: {
         style: {
            paddingVertical: 10,
            height: 60
         }
      }
   }
);

export default createAppContainer(TabNavigator);
