import { Action, combineSlices, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authSlice } from "../slices/authSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { profileSlice } from "../slices/profileSlice.ts";

const rootReducer = combineSlices(authSlice, profileSlice);

export type RootState = ReturnType<typeof rootReducer>



const store = configureStore({
  reducer: rootReducer,
});

export default store
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()