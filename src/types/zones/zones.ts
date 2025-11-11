export interface zone {
  id_object: string;
  user_id_zone: string;

  // 2 одинаковых поля, с бэка такая херня
  id: string;
  id_zone: string;

  // 2 одинаковых поля, с бэка такая херня
  name_zone: string;
  name: string;

  // 2 одинаковых поля, с бэка такая херня
  qr_zone: string;
  qr: string;
}

export interface zoneState {
  loading: boolean;
  error: string | null;
  message?: string;
}

export interface zoneResponse {
  success: boolean;
  message?: string;
}
