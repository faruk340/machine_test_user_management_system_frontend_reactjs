import { AUTHCHECK } from "../types/actionType";


export const userAuth = (data) => {
    return {
        type: AUTHCHECK,
        data: data
    }
}