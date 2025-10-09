// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/api";

// interface ObjectState {} 

// const initialState: ObjectState = {};

// export const getObject = createAsyncThunk<
//   AuthMessage, // возвращаемое значение при fulfilled
//   { login: string; password: string }, // аргументы
//   { rejectValue: string } // тип ошибки при rejected
// >("auth/loginUser", async (payload, thunkAPI) => {
//   try {
//     const response = await api.post<AuthResponse>("auth/", payload);

//     const { success, message } = response.data;

//     if (!success || typeof message === "string") {
//       return thunkAPI.rejectWithValue(
//         typeof message === "string" ? message : "Ошибка"
//       );
//     }

//     // if (message.token) {
//     //   localStorage.setItem("tokenCLEANING", message.token);
//     // }

//     return message;
//   } catch (err: any) {
//     const error = err as { response?: { data?: { message?: string } } };
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Ошибка авторизации"
//     );
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // loginUser
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
