import {SET_USER_INFO} from "./constants";

export const initState = {
    userInfo: null,
}

function reducer(state, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            throw new Error('Invalid action!')
    }
}

export default reducer;