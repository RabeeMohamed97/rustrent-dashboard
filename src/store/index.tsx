import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import modelSlice from './modelSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    modal: modelSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
