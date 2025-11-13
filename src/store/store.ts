import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import authReducer from "./slices/authSlice";
import objectsReducer from "./slices/objectsSlice";
import objectReducer from "./slices/objectSlice";
import zonesReducer from "./slices/zonesSlice";
import usersReducer from "./slices/usersSlice";
import teamsReducer from "./slices/teamsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    objects: objectsReducer,
    object: objectReducer,
    zones: zonesReducer,
    users: usersReducer,
    teams: teamsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
