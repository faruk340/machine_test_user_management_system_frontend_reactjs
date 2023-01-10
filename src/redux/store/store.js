import { createStore } from "redux";
import userAuthReducer from "../reducers/authReducer";

const store = createStore(userAuthReducer)

export default store;