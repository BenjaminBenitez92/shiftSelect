

import { useReducer } from 'react';
import {
  UPDATE_SHIFTS,
  ADD_TO_CALENDAR,
  UPDATE_CALENDAR_QUANTITY,
  REMOVE_FROM_CALENDAR,
  ADD_MULTIPLE_TO_CALENDAR,
  UPDATE_HOSPITALS,
  UPDATE_CURRENT_HOSPITAL,
  CLEAR_CALENDAR,
  TOGGLE_CALENDAR
} from "./actions";
const initialState = {
  shifts: [],
  hospital: [],
  currentHospital: '',
  calendar: [],
  cartOpen: false
};
export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SHIFTS:
      return {
        ...state,
        shifts: [...action.shifts],
      };
    case ADD_TO_CALENDAR:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.shift],
      };
    case ADD_MULTIPLE_TO_CALENDAR:
      return {
        ...state,
        cart: [...state.cart, ...action.shifts],
      };
    case UPDATE_CALENDAR_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(shift => {
          if (action._id === shift._id) {
            shift.shiftQuantity = action.shiftQuantity
          }
          return shift
        })
      };
    case REMOVE_FROM_CALENDAR:
      let newState = state.cart.filter(shift => {
        return shift._id !== action._id;
      });
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };
    case CLEAR_CALENDAR:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };
    case TOGGLE_CALENDAR:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    case UPDATE_HOSPITALS:
      return {
        ...state,
        hospitals: [...action.hospitals],
      };
    case UPDATE_CURRENT_HOSPITAL:
      return {
        ...state,
        currentHospital: action.currentHospital
      }
    default:
      return state;
  }
};
// export default reducers

export function useShiftReducer(initialState) {
  return useReducer(reducer, initialState);
}