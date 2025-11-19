import { useAppSelector } from "@/store/store";

import type { Option } from "@/types/ui/select/select";

import { getOptionForObjects } from "@/utils/getOptionForObjects";
import { getOptionForTeams } from "@/utils/getOptionForTeams";
import { getOptionForZones } from "@/utils/getOptionForZones";

export const usePlannerOptions = () => {
  const { DATA: objects } = useAppSelector((state) => state.objects);
  const { data: objectCurrent } = useAppSelector((state) => state.object);

  const optionsObjects = getOptionForObjects(objects) || [];

  const optionsZones = getOptionForZones(objectCurrent?.zones) || [];

  const optionsUsers: Option[] = (objectCurrent?.users || [])
    .filter((user) => user.role === 3) // оставляем только с ролью 3
    .map((user) => ({
      value: String(user.id),
      label: `${user.name} ${user.surname}`,
    }));

  const optionsTeams = getOptionForTeams(objectCurrent?.teams) || [];

  return {
    optionsObjects,
    optionsZones,
    optionsUsers,
    optionsTeams,
  };
};
