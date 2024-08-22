import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';

import authApi from '../api/Auth';
import resApi from '../api/Resturants/Categories';
import mealsApi from '../api/Resturants/Meals';
import modelSlice from './modelSlice';
import settingApi from '../api/Resturants/SettingSlice';
import settingsApi from '../api/Resturants/Settings';
import couponsApi from '../api/Resturants/Coupons';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    modal: modelSlice,
    [authApi.reducerPath]: authApi.reducer,
    [resApi.reducerPath]: resApi.reducer,
    [mealsApi.reducerPath]: mealsApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [couponsApi.reducerPath]: couponsApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            resApi.middleware,
            mealsApi.middleware,
            settingApi.middleware,
            settingsApi.middleware,
            couponsApi.middleware
            // cartApi.middleware,
            // menuApi.middleware,
            // orderApi.middleware,
            // paymentApi.middleware,

            // contactUsApi.middleware
        ),
});

export type IRootState = ReturnType<typeof rootReducer>;
