import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import modelSlice from './modelSlice';
import authApi from '../api/Auth';
import resApi from '../api/Resturants/Categories';
import mealsApi from '../api/Resturants/Meals';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    modal: modelSlice,
    [authApi.reducerPath]: authApi.reducer,
    [resApi.reducerPath]: resApi.reducer,
    [mealsApi.reducerPath]: mealsApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            resApi.middleware,
            mealsApi.middleware
            // cartApi.middleware,
            // menuApi.middleware,
            // orderApi.middleware,
            // paymentApi.middleware,

            // contactUsApi.middleware
        ),
});

export type IRootState = ReturnType<typeof rootReducer>;
