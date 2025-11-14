import type { Teams } from "@/types/teams/teams";

export const getOptionForTeams = (teams: Teams[] | undefined) => {
  return teams?.map((team) => ({
    value: team.id ? String(team.id) : "",
    label: team.name,
  }));
};
