import React from "react";
import { useGetSingleUserQuery } from "../../redux/users/userApi";
// import { UserType } from "../../types/user";

export const UserDetails = ({ userId }: { userId: number }) => {
  const { data } = useGetSingleUserQuery(userId);
  return (
    // <div style={{ border: "1px solid red" }}>
    //   <div>{data?.role}</div>
    //   <div>{data?.email}</div>
    //   <div>{data?.avatar}</div>
    // </div>
    <pre>{JSON.stringify(data, undefined, 2)}</pre>
  );
};
