import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import appReducer from './slices/AppSlices'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeSlice } from "./ServiceApis/HomeSlice";
import {VideoSlice} from './ServiceApis/VideoSlice'
import { combineReducers } from 'redux';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['app']
}

const rootReducer = combineReducers({
    app: appReducer,
    [HomeSlice.reducerPath]: HomeSlice.reducer,
    [VideoSlice.reducerPath] : VideoSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            HomeSlice.middleware,
            VideoSlice.middleware
        ),
});


export const persistor = persistStore(store);
