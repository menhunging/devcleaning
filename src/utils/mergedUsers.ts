export const mergedUsers = (
  newUsers: { id_user: number; name: string }[],
  users:
    | {
        id: string | number;
        login: string;
        name: string;
        role: number;
        surname: string;
      }[]
    | undefined
) => {
  return newUsers.map((num) => {
    const match = users?.find((u) => u.id === num.id_user);
    return {
      ...num,
      id_user: num.id_user,
      name: match ? match.name : "",
      login: match ? match.login : "",
      role: match ? match.role : 3,
      surname: match ? match.surname : "",
    };
  });
};
