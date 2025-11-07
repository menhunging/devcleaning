// slices

export interface ObjectItem {
  id: string;
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

// типы для добавление одного обьекта

export interface ObjectForm {
  id: string;
  name: string;
  address: string;
  contacts: string;
  photo?: string;
}

export interface ObjectFormResponse {
  success: boolean;
  message?: string;
}

// /slices
