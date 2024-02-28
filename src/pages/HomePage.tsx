import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <div>HomePage</div>
    
      <div>
        <Link to="UserList">UserList</Link>
      </div>
      <div>
        <Link to="products">product</Link>
      </div>
      <div>
        <Link to="singleUser">singleUser</Link>
      </div>
    </div>
  );
};
