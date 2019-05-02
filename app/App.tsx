import React from "react";
import { ApolloProvider } from "react-apollo";
import { createStore, combineReducers } from "redux";
import { countReducer } from "./src/reducers";
import { Provider } from "react-redux";
import SwitchNavigator from "./src/navigation/SwitchNavigator";
import client from "./src/apollo/apollo";

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
   <ApolloProvider client={client}>
      <Provider store={store}>
         <SwitchNavigator />
      </Provider>
   </ApolloProvider>
);
export default App;
