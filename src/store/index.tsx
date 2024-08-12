import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import modelSlice from './modelSlice';
import authApi from '../api/Auth';
import resApi from '../api/Resturants/resturant';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    modal: modelSlice,
    [authApi.reducerPath]: authApi.reducer,
    [resApi.reducerPath]: resApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            resApi.middleware

            // contactUsApi.middleware
        ),
});

export type IRootState = ReturnType<typeof rootReducer>;
