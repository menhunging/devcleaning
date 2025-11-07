import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";
import type { ObjectItem } from "@/types/objects";

interface ObjectState {
  loading: boolean;
  error: string | null;
  data: ObjectItem | null;
}

const initialState: ObjectState = {
  loading: false,
  error: null,
  data: null,
};

export const getObjectById = createAsyncThunk<
  ObjectItem,
  string,
  { rejectValue: string }
>("object/getById", async (id, thunkAPI) => {
  try {
    const response = await api.post("get_object/", { id });

    const { success, DATA, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при получении объекта"
      );
    }

    return DATA[0]; // с бэка так приходит, важно.
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при получении объекта");
  }
});

export const updateObject = createAsyncThunk<
  boolean,
  {
    id: string;
    name: string;
    address: string;
    contacts: string;
    photo?: string;
  },
  { rejectValue: string }
>("object/updateObject", async (payload, thunkAPI) => {
  try {
    const response = await api.post("edit_object/", payload);

    const { success, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при обновлении обьекта"
      );
    }

    return success;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при обновлении обьекта");
  }
});

const objectSlice = createSlice({
  name: "object",
  initialState,
  reducers: {
    clearObject(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // getObjectById

      .addCase(getObjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getObjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getObjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      })

      // updateObject

      .addCase(updateObject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateObject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateObject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      });
  },
});

export const { clearObject } = objectSlice.actions;
export default objectSlice.reducer;
