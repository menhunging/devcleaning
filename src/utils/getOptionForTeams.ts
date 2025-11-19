export const getOptionForTeams = (
  teams: { id: string | number; name: string }[] | undefined
) => {
  return teams?.map((team) => ({
    value: team.id ? String(team.id) : "",
    label: team.name,
  }));
};
