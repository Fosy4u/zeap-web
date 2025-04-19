import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { WishInterface } from "@/interface/interface";

export const GLOBAL_FEATURE_KEY = "global";

export interface ToastInterface {
  message: string;
  variant: "success" | "error" | "info";
  id: number;
  title?: string;
}

const initialState = {
  toasts: [] as ToastInterface[],
  authToken: "",
  currency: {
    name: "Naira",
    symbol: "₦",
  },
  wishList: [] as WishInterface[],
  isWishListLoading: true,

};

export const globalSlice = createSlice({
  name: GLOBAL_FEATURE_KEY,
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push({
        ...action.payload,
        id: Math.floor(Math.random() * 10000),
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => action.payload !== toast.id
      );
    },

    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    setIsWishListLoading: (state, action) => {
      state.isWishListLoading = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;

export const globalActions = globalSlice.actions;

const getGlobalState = (rootState: RootState) => rootState[GLOBAL_FEATURE_KEY];

const selectAuthToken = createSelector(
  getGlobalState,
  (state) => state.authToken
);
const selectToasts = createSelector(getGlobalState, (state) => state.toasts);
const selectCurrency = createSelector(
  getGlobalState,
  (state) => state.currency
);
const selectWishList = createSelector(
  getGlobalState,
  (state) => state.wishList
);
const selectIsWishListLoading = createSelector(
  getGlobalState,
  (state) => state.isWishListLoading
);

export const globalSelectors = {
  getGlobalState,
  selectToasts,
  selectAuthToken,
  selectCurrency,
  selectWishList,
  selectIsWishListLoading,
};
