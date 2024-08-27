import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';

import authApi from '../api/Auth';
import mealsApi from '../api/Resturants/Meals';
import modelSlice from './modelSlice';
import settingApi from '../api/Resturants/SettingSlice';
import settingsApi from '../api/Resturants/Settings';
import AdvertisementsApi from '../api/Resturants/Advertisements';
import TableApi from '../api/Resturants/Table';
import CategoriesApi from '../api/Resturants/Categories';
import CountryApi from '../api/Resturants/Country_City_Region';
import ProfileApi from '../api/Resturants/Profile';
import offerApi from '../api/Resturants/Offer';
import couponsApi from '../api/Resturants/Coupons';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    modal: modelSlice,
    [authApi.reducerPath]: authApi.reducer,
    [TableApi.reducerPath]: TableApi.reducer,
    [mealsApi.reducerPath]: mealsApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [AdvertisementsApi.reducerPath]: AdvertisementsApi.reducer,
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
    [CountryApi.reducerPath]: CountryApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [couponsApi.reducerPath]: couponsApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            mealsApi.middleware,
            settingApi.middleware,
            offerApi.middleware,
            settingsApi.middleware,
            AdvertisementsApi.middleware,
            TableApi.middleware,
            CategoriesApi.middleware,
            CountryApi.middleware,
            ProfileApi.middleware,
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
