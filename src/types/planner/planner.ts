export interface Planner {
  id: number | null;
  name: string;
  data_create: string;
  description: string;
  date_start: string;
  time_start: string;
  data_end: string;
  time_end: string;
  status: number | null;
  name_object: string | null;
  name_zone: string | null;
  name_user: string | null;
  surname_user: string | null;
  name_team: string | null;
  name_status: string | null;

  id_object: string | null;
  id_zone: string | null;
  id_user: string | null;
  id_team: string | null;
}

export interface PlannerForm {
  success: boolean;
  message?: string | null;
  DATA: Planner[] | null;
}
