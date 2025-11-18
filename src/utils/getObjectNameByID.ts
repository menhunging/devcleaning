import type { ObjectItem } from "@/types/objects/objects";

export function getObjectNameByID(
  objects: ObjectItem[],
  id: string | number
): string {
  const mall = objects.find((item) => String(item.id) === String(id));

  return mall ? mall.name : "";
}
