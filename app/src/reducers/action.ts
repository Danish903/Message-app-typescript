import { INCREMENT, DECREMENT } from "./types";

export function add() {
   return {
      type: INCREMENT
   };
}

export function substract() {
   return {
      type: DECREMENT
   };
}
