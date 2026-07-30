export const UserList = () => {
  const { users } = useUsers();

  return (
    <div>
      {users.map((user) => (
        <span>{user.name}</span>
      ))}
    </div>
  );
};
