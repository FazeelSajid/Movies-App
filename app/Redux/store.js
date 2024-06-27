import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Features/moviesSlice";
import { persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig ={
    key : 'root',
    storage: AsyncStorage,
    whitelist: ['favourities'],
}

const persistedReducer = persistReducer(persistConfig, moviesReducer);

export const store = configureStore({
    reducer: {
        movies : persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export const persistor = persistStore(store);
