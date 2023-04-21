import {ADD_CRITERIA, ADD_ITEM, ADD_NUMBER_OF_ITEM, CRITERIA_ITEM_RANK, CRITERIA_RANK, SET_GOAL} from "./constants";

export const setGoal = (payload) =>({
    type: SET_GOAL,
    payload
})