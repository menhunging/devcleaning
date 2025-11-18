import type { Users } from "../users/users";

export interface zone {
  id_zone: string;
  id_object: string;
  user_id_zone: string | number;
  name_zone: string;
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

export interface ZonesFormProps {
  mode?: "add" | "edit";
  id_object: string;
  initialData?: {
    id_zone: string;
    id_object: string;
    name_zone: string;
    user_id_zone: string | number;
    qr: string;
  } | null;
  loading?: boolean;
  users: Users[];
  onSuccess: (object: {
    id_zone: string;
    id_object: string;
    user_id_zone: string | number;
    name_zone: string;
    qr: string;
  }) => void;
  onClose: () => void;
}
