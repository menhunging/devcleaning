import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

import type { AuthMessage, AuthResponse, AuthState } from "@/types/auth";

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("tokenCLEANING"),
  userInfo: {
    login: "",
    role: "",
    email: "",
  },
};

export const loginUser = createAsyncThunk<
  AuthMessage, // возвращаемое значение при fulfilled
  { login: string; password: string }, // аргументы
  { rejectValue: string } // тип ошибки при rejected
>("auth/loginUser", async (payload, thunkAPI) => {
  try {
    const response = await api.post<AuthResponse>("auth/", payload);

    const { success, message } = response.data;

    if (!success || typeof message === "string") {
      return thunkAPI.rejectWithValue(
        typeof message === "string" ? message : "Ошибка авторизации"
      );
    }

    if (message.token) {
      localStorage.setItem("tokenCLEANING", message.token);
    }

    return message;
  } catch (err: any) {
    const error = err as { response?: { data?: { message?: string } } };
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Ошибка авторизации"
    );
  }
});

export const authUser = createAsyncThunk<
  AuthMessage,
  void,
  { rejectValue: string }
>("auth/authUser", async (_, thunkAPI) => {
  try {
    const response = await api.post<AuthResponse>("me/");
    const { success, message } = response.data;

    if (!success || typeof message === "string") {
      return thunkAPI.rejectWithValue(
        typeof message === "string" ? message : "Ошибка авторизации"
      );
    }

    return message;
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Ошибка при проверке токена"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
      state.userInfo = {
        login: "",
        role: "",
        email: "",
      };
      localStorage.removeItem("tokenCLEANING");
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo.login = action.payload.login;
        state.userInfo.email = action.payload.email;
        state.userInfo.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // authUser
      .addCase(authUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo.login = action.payload.login;
        state.userInfo.email = action.payload.email;
        state.userInfo.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isAuthenticated = false;
        localStorage.removeItem("tokenCLEANING");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
