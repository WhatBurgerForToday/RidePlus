import { useReducer } from "react";

/**
 * A hook that allows you to use an object as state.
 * @param initialState initial state
 * @returns [state, updater]
 */
export const useObjectState = <T>(initialState: T) => {
  return useReducer(
    (state: T, newState: Partial<T>) => ({ ...state, ...newState }),
    initialState,
  );
};
