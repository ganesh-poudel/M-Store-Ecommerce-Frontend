import React from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    backgroundImage: `url("https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
};

export const HomePage = () => {
  return <div style={styles.container}></div>;
};
