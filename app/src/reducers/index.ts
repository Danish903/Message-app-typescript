import {
   CounterState,
   INCREMENT,
   DECREMENT,
   CounterActionTypes
} from "./types";

const initialState: CounterState = {
   count: 0
};

export function countReducer(
   state = initialState,
   action: CounterActionTypes
): CounterState {
   switch (action.type) {
      case INCREMENT:
         return {
            count: state.count + 1
         };
      case DECREMENT:
         return {
            count: state.count - 1
         };
      default:
         return state;
   }
}
