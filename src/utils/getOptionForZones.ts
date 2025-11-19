import type { zone } from "@/types/zones/zones";

export const getOptionForZones = (zones: zone[] | undefined) => {
  return zones?.map((zon) => ({
    value: zon.id_zone.toString(),
    label: zon.name_zone,
  }));
};
