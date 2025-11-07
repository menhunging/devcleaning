// slices

export interface ObjectItem {
  id: number;
  name: string;
  photo: string;
  adress: string;
  contacts: string;
  zones_count: number;
  tasks_count: number;
  users_count: number;
  manager: number;
}

export interface ObjectsResponse {
  // типы для ответа get_objects
  DATA: ObjectItem[];
  success: boolean;
  message?: string;
}

export interface ObjectsState {
  loading: boolean;
  error: string | null;
  DATA: ObjectItem[];
}

// /slices
