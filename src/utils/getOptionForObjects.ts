import type { ObjectItem } from "@/types/objects/objects";

export const getOptionForObjects = (objects: ObjectItem[] | undefined) => {
  return objects?.map((obj) => ({
    value: obj.id.toString(),
    label: obj.name,
  }));
};
