import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import {
   HomeNavigator,
   SearchNavigator,
   ProfileNavigator,
   UploadNavigator,
   ActivityNavigator
} from "./StackNavigator";

const TabNavigator = createBottomTabNavigator(
   {
      Home: {
         screen: HomeNavigator,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: () => <Ionicons name="ios-home" size={32} />
         }
      },
      Search: {
         screen: SearchNavigator,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: () => <Ionicons name="ios-search" size={32} />
         }
      },
      Upload: {
         screen: UploadNavigator,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: () => <Ionicons name="ios-add" size={32} />
         }
      },
      Activity: {
         screen: ActivityNavigator,
         navigationOptions: {
            tabBarLabel: " ",
            tabBarIcon: ({ focused }: { focused: Boolean }) => {
               const iconName = focused ? "ios-heart" : "ios-heart-empty";
               return <Ionicons name={iconName} size={32} />;
            }
         }
      },
      Profile: {
         screen: ProfileNavigator,
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
