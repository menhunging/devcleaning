import api from "@/api/api";
import type {
  initialStateTasks,
  ITask,
  ITaskFormData,
} from "@/types/tasks/tasks";
// import { formatDate } from "@/utils/formatDate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState: initialStateTasks = {
  loading: false,
  error: null,
  DATA: [],
  task: null,
};

export const getTasksAll = createAsyncThunk<
  ITask[],
  {
    status?: number;
    filters?: {
      id_object?: string;
      id_zones?: string;
      id_user?: string;
      id_teams?: string;
    };
  },
  { rejectValue: string }
  // >("tasks/getTasksAll", async ({ status = 1, filters }, thunkAPI) => {
>("tasks/getTasksAll", async (_, thunkAPI) => {
  try {
    // let dateNow: string | null = null;
    // let date_from = "";
    // let date_to = "";

    // if (status == 5) {
    //   status = 1;
    //   date_from = formatDate(Date.now() + 1 * 24 * 60 * 60 * 1000); // Прибавляем один день
    //   date_to = formatDate(Date.now() + 7 * 24 * 60 * 60 * 1000); // Прибавляем одну неделю
    // }

    // else {
    //   dateNow = status !== 4 ? formatDate(Date.now()) : null; // выводим все статусы только сегодня, кроме "Пропуск"
    // }

    const response = await api.post<ITaskFormData>("get_planner_user_all/", {
      // filter: {
      //   // date_from: date_from ? date_from : undefined,
      //   // date_to: date_to ? date_to : undefined,
      //   // date: dateNow ? dateNow : undefined,
      //   // status: status,
      //   // ...(filters?.id_object && { id_object: filters.id_object }),
      //   // ...(filters?.id_zones && { id_zone: filters.id_zones }),
      //   // ...(filters?.id_teams && { id_team: filters.id_teams }),
      //   // ...(filters?.id_user && { id_user: filters.id_user }),
      // },
    });

    const { success, DATA, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при получении заданий"
      );
    }

    return DATA;
  } catch (err: any) {
    const error = err as { response?: { data?: { message?: string } } };
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Ошибка при получении всех заданий"
    );
  }
});

export const addTask = createAsyncThunk<
  boolean,
  {
    description: string;
    id_object: string;
    id_zone: string;
    id_user: string;
    id_team: string;
    time_start: string;
    time_end: string;
    duration: string;
    date_start: string;
    data_create: string;
    name: string;
  },
  { rejectValue: string }
>("tasks/addTask", async (payload, thunkAPI) => {
  try {
    const response = await api.post("add_planner_user/", payload);

    const { success, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при добавлении задачи"
      );
    }

    return success;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при добавлении задачи");
  }
});

export const editTaskByID = createAsyncThunk<
  boolean,
  {
    id: string;
    name: string;
    description: string;
    id_user: string;
    id_team: string;
    time_start: string;
    time_end: string;
    duration: string;
    date_start: string;
  },
  { rejectValue: string }
>("tasks/editTaskByID", async (payload, thunkAPI) => {
  try {
    const response = await api.post("/edit_planner_user/", payload);

    const { success, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(message || "Ошибка при обновлении таски");
    }

    return success;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при обновлении таски");
  }
});

export const deleteTasks = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>("tasks/deleteTasks", async (payload, thunkAPI) => {
  try {
    const response = await api.post<ITaskFormData>("delete_planner_user/", {
      id: payload,
    });

    const { success, message } = response.data;

    if (!success) {
      return thunkAPI.rejectWithValue(
        message || "Ошибка при добавлении обращения"
      );
    }

    return success;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Ошибка при добавлении обращения");
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearCurrentTask: (state) => {
      state.task = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getTasks
      .addCase(getTasksAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksAll.fulfilled, (state, action) => {
        state.loading = false;
        // state.DATA = action.payload;
        // мутируем , чтобы показывать сначала новый таск, короче просто revert делаю
        state.DATA = Array.isArray(action.payload)
          ? action.payload.slice().reverse()
          : [];
      })
      .addCase(getTasksAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addTask
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // editTaskByID
      .addCase(editTaskByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTaskByID.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editTaskByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteTasks
      .addCase(deleteTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTasks.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentTask } = tasksSlice.actions;
export default tasksSlice.reducer;
