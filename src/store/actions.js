import { SET_ORDER_TOUR_INFO, SET_USER_INFO } from "./constants";

export const setUserInfo = (payload) => ({
  type: SET_USER_INFO,
  payload,
});

export const setOrderTourInfo = (payload) => ({
  type: SET_ORDER_TOUR_INFO,
  payload,
});
