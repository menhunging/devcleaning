import type { Planner, PlannerForm } from "@/types/planner/planner";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

interface PlannerState {
  loading: boolean;
  error: string | null;
  DATA: Planner[] | null;
}

const initialState: PlannerState = {
  loading: false,
  error: null,
  DATA: null,
};

export const getPlanner = createAsyncThunk<
  PlannerForm["DATA"],
  void,
  { rejectValue: string }
>("planner/getPlanner", async (_, thunkAPI) => {
  try {
    const response = await api.post("get_planners/");

    const { success, DATA, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(message || "Ошибка при получении задач");
    }

    return DATA;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при получении задач");
  }
});

export const addPlanner = createAsyncThunk<
  PlannerForm["DATA"],
  Planner,
  { rejectValue: string }
>("planner/addPlanner", async (payload, thunkAPI) => {
  try {
    const response = await api.post("add_planner/", payload);

    const { success, DATA, message } = response.data;

    console.log("DATA", DATA);

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при добавлении задачи"
      );
    }

    return DATA;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при добавлении задачи");
  }
});

// export const updateObject = createAsyncThunk<
//   boolean,
//   ObjectForm,
//   { rejectValue: string }
// >("object/updateObject", async (payload, thunkAPI) => {
//   try {
//     const response = await api.post("edit_object/", payload);

//     const { success, message } = response.data;

//     if (!success) {
//       return thunkAPI.rejectWithValue(
//         message || "Ошибка при обновлении обьекта"
//       );
//     }

//     return success;
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue("Ошибка при обновлении обьекта");
//   }
// });

// export const deleteObject = createAsyncThunk<
//   boolean,
//   string,
//   { rejectValue: string }
// >("object/deleteObject", async (id, thunkAPI) => {
//   try {
//     const response = await api.post("delete_object/", { id: id });

//     const { success, message } = response.data;

//     if (!success) {
//       return thunkAPI.rejectWithValue(message || "Ошибка при удалении объекта");
//     }

//     return success;
//   } catch (err: any) {
//     const error = err as { response?: { data?: { message?: string } } };
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || "Ошибка при удалении объекта"
//     );
//   }
// });

const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // addPlanner
      .addCase(addPlanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlanner.fulfilled, (state) => {
        state.loading = false;
        // state.DATA = action.payload;
      })
      .addCase(addPlanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      })

      // getPlanner
      .addCase(getPlanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlanner.fulfilled, (state, action) => {
        state.loading = false;
        state.DATA = action.payload;
      })
      .addCase(getPlanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка";
      });

    // // deleteObject
    // .addCase(deleteObject.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(deleteObject.fulfilled, (state) => {
    //   state.loading = false;
    // })
    // .addCase(deleteObject.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });
  },
});

export const {} = plannerSlice.actions;
export default plannerSlice.reducer;
