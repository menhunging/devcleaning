// руки оторвать

export const mergedUsers = (
  newUsers: { id_user: number; name: string }[],
  users:
    | {
        id: number;
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
      login: match ? match.login : "",
      role: match ? match.role : 3,
      surname: match ? match.surname : "",
    };
  });
};
