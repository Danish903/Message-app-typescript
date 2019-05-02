import React from "react";
import TabNavigatior from "./src/navigation/TabNavigatior";
import { createStore, combineReducers } from "redux";
import { countReducer } from "./src/reducers";
import { Provider } from "react-redux";
import SwitchNavigator from "./src/navigation/SwitchNavigator";

const rootReducer = combineReducers({
   count: countReducer
});

export type AppState = ReturnType<typeof rootReducer>;

function configureStore() {
   const store = createStore(rootReducer);
   return store;
}

const store = configureStore();

interface Props {}

const App = () => (
   <Provider store={store}>
      <SwitchNavigator />
   </Provider>
);
export default App;
