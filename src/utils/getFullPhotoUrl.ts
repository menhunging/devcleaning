export const getFullPhotoUrl = (path: string): string => {
  // для получения полного пути для фотки, с бэка приходит не полный путь
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return `${baseUrl}${path}`;
};
