import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import zeapApi from "../services/zeapApi.slice";
import { GLOBAL_FEATURE_KEY, globalReducer } from "../services/global.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [zeapApi.reducerPath]: zeapApi.reducer,
      [GLOBAL_FEATURE_KEY]: globalReducer,
    },
    // Additional middleware can be passed to this array
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([zeapApi.middleware]),
    devTools: process.env.REACT_APP_ENV !== "production",
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// const store = configureStore({
//   reducer: {
//     [zeapApi.reducerPath]: zeapApi.reducer,
//     [GLOBAL_FEATURE_KEY]: globalReducer,
//   },

//   // Additional middleware can be passed to this array
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({}).concat([zeapApi.middleware]),
//   devTools: process.env.REACT_APP_ENV !== "production",
// });

// setupListeners(store.dispatch);
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
