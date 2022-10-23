import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';
import upcomingGamesReducer from "./reducers/upcomingGamesReducer";
import userReducer from "./reducers/userReducer";


export const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
        upcomingGames: upcomingGamesReducer,    
    },
    middleware: [
        thunk,
        promiseMiddleware,
        promise,
        logger,
    ]
})