import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("tokenCLEANING"),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("tokenCLEANING"),
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: { login: string; password: string }, thunkAPI) => {
    try {
      const response = payload.login === "admin" ? "ok" : "not";
      // const response = await api.get("users/");
      // console.log(response.data);

      // const response = await api.post("auth/", payload);
      // const token = response.data.token;
      // localStorage.setItem("tokenCLEANING", token);
      localStorage.setItem("tokenCLEANING", "OK");
      return response;
    } catch (err: any) {
      console.log("auth error slice:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("tokenCLEANING");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
