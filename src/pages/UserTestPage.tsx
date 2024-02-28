import React from "react";
import { useAddUserMutation, useDeleteUserMutation, useGetAllUsersQuery } from "../redux/users/userApi";
import { UserDetails } from "../components/userDetails/UserDetails";

export const UserTestPage = () => {
  const { data, isLoading, error, isFetching, isSuccess } = useGetAllUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const newUser = {
    name: "abc",
    email: "qrs@gmail.com",
    password: "1234abc",
    avatar: "https://picsum.photos/800",
  };
  const addUserHandler = async () => {
    await addUser(newUser);
  };

  const deleteUserHandler = async (id: number) => {
    await deleteUser(id);
  };

  return (
    // <div>
    //   <button onClick={() => deleteUserHandler(id)}>delete User</button>
    //   <button onClick={() => addUserHandler()}>add User</button>
    // </div>
    <div>
      {isLoading && <div> Loading ..... </div>}
      {isFetching && <div> fetching ..... </div>}
      {error && <div> error loading .... </div>}
      {isSuccess && (
        <div>
          {data?.map((user) => {
            return (
              <div>
                <UserDetails userId={user.id} />
                <button onClick={() => deleteUserHandler(user.id)}>delete User</button>
                <button onClick={()=>addUserHandler()}>add</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
