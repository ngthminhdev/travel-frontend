import {SET_GOAL} from "./constants";

export const initState = {
    goal: '',
}

function reducer(state, action) {
    switch (action.type) {
        case SET_GOAL:
            return {
                ...state,
                goal: action.payload
            }
        default:
            throw new Error('Invalid action!')
    }
}

export default reducer;