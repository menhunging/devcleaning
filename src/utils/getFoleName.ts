export const getRoleName = (role: number): string => {
  const roles = ["Администратор", "Менеджер", "Сотрудник"];

  return `${roles[role - 1]}`;
};
