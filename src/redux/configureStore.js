import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./reducers/user";
import postReducer from "./reducers/post";

const reducer = combineReducers({
    user: userReducer,
    posts: postReducer,
});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
});

export default store;
