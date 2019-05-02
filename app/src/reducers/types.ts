// Describing the shape of the chat's slice of state
// export interface Message {
//    user: string;
//    message: string;
//    timestamp: number;
// }

export interface CounterState {
   count: number;
}

// Describing the different ACTION NAMES available
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

interface AddAction {
   type: typeof INCREMENT;
   // payload: Message;
}

interface SubtractAction {
   type: typeof DECREMENT;
   // meta: {
   //    timestamp: number;
   // };
}

export type CounterActionTypes = AddAction | SubtractAction;
