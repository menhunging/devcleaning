import type { Appeal, AppealsForm } from "@/types/appeals/appeals";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

interface AppealsState {
  loading: boolean;
  error: string | null;
  DATA: Appeal[] | null;
}

const initialState: AppealsState = {
  loading: false,
  error: null,
  DATA: null,
};

export const getAppeals = createAsyncThunk<
  AppealsForm["DATA"],
  void,
  { rejectValue: string }
>("appeals/getAppeals", async (_, thunkAPI) => {
  try {
    const response = await api.post<AppealsForm>("get_appeals/");

    const { success, DATA, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при получении обращений"
      );
    }

    return DATA;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при получении обращений");
  }
});

export const addAppeal = createAsyncThunk<
  AppealsForm["DATA"],
  Appeal,
  { rejectValue: string }
>("appeals/addAppeal", async (payload, thunkAPI) => {
  try {
    const response = await api.post<AppealsForm>("add_appeal/", payload);

    const { success, DATA, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при добавлении обращения"
      );
    }

    return DATA;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при добавлении обращения");
  }
});

export const updateAppeal = createAsyncThunk<
  AppealsForm["DATA"],
  Appeal,
  { rejectValue: string }
>("appeals/updateAppeal", async (payload, thunkAPI) => {
  try {
    const response = await api.post<AppealsForm>("updateAppeal/", payload);

    const { success, DATA, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при обновлении обращения"
      );
    }

    return DATA;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при обновлении обращения");
  }
});

export const changeAppealStatus = createAsyncThunk<
  { success: boolean; payload: { id: string } },
  { id: string },
  { rejectValue: string }
>("appeals/changeAppealStatus", async (payload, thunkAPI) => {
  try {
    const response = await api.post<AppealsForm>(
      "status_change_appeal/",
      payload
    );

    const { success, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при изменении статуса обращения"
      );
    }

    return {
      success,
      payload,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при изменении статуса обращения");
  }
});

const appealsSlice = createSlice({
  name: "appeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // addAppeal
      .addCase(addAppeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAppeal.fulfilled, (state, action) => {
        state.loading = false;
        state.DATA = action.payload;
      })
      .addCase(addAppeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      })

      // updateAppeal
      .addCase(updateAppeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppeal.fulfilled, (state, action) => {
        state.loading = false;
        state.DATA = action.payload;
      })
      .addCase(updateAppeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      })

      // getAppeals
      .addCase(getAppeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppeals.fulfilled, (state, action) => {
        state.loading = false;
        state.DATA = action.payload;
      })
      .addCase(getAppeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      })

      // changeAppealStatus
      .addCase(changeAppealStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAppealStatus.fulfilled, (state, action) => {
        state.loading = false;

        const { payload } = action.payload;

        if (state.DATA) {
          const found = state.DATA.find(
            (item) => item.id === Number(payload.id)
          );
          if (found) {
            found.status = found.status === 0 ? 1 : 0;
            found.name_status = found.status === 0 ? "Активно" : "Остановлено";
          }
        }
      })
      .addCase(changeAppealStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      });
  },
});

export default appealsSlice.reducer;

