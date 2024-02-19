import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <div>HomePage</div>
      <Link to="/products">product</Link>
    </div>
  );
};
