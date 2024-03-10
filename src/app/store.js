import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gaelicStarReducer from "./features/gaelicStar/gaelicStar.slice";
import cartDataReducer from "./features/gaelicStar/cartData.slice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};
const rootReducer = combineReducers({
  gaelicStart: gaelicStarReducer,
  cartData: cartDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;

// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import gaelicStarReducer from "./features/gaelicStar/gaelicStar.slice";
// import cartDataReducer from "./features/gaelicStar/cartData.slice"
// const rootReducer = combineReducers({
//   gaelicStart: gaelicStarReducer,
//     cartData: cartDataReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;
