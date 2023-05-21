import { SET_ORDER_TOUR_INFO, SET_USER_INFO } from "./constants";

export const initState = {
  userInfo: null,
  orderTourInfo: null,
};

function reducer(state, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_ORDER_TOUR_INFO:
      return {
        ...state,
        orderTourInfo: action.payload,
      };
    default:
      throw new Error("Invalid action!");
  }
}

export default reducer;
