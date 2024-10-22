import {
  Action,
  combineSlices,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { authActions, authSlice } from "../slices/authSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { profileSlice } from "../slices/profileSlice.ts";
import postsSlice from "../slices/postsSlice.ts";

const rootReducer = combineSlices(authSlice, profileSlice, postsSlice);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
// dispatch action to see if the user is logged  
store.dispatch(authActions.getUserIdLogged());

export default store;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];



export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
