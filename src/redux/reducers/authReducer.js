import { AUTHCHECK } from "../types/actionType";

const initialAuthState = {
    login: false
}

const userAuthReducer = (state = initialAuthState, action) => {

    switch (action.type) {
        case AUTHCHECK:
            return {
                login: action.data
            }
        default:
            return state;
    }
}

export default userAuthReducer;