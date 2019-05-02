import {
   createSwitchNavigator,
   createAppContainer,
   NavigationContainer
} from "react-navigation";

import TabNavigatior from "./TabNavigatior";
import AuthNavigator from "./AuthNavigator";

const INITIAL_ROUTE_NAME: string = "Auth";

const SwitchNavigator: NavigationContainer = createSwitchNavigator(
   {
      Home: {
         screen: TabNavigatior
      },
      Auth: {
         screen: AuthNavigator
      }
   },
   {
      initialRouteName: INITIAL_ROUTE_NAME
   }
);

export default createAppContainer(SwitchNavigator);
