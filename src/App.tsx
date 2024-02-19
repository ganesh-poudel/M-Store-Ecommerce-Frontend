import React from "react";
import "./App.css";
import { ProductListPage } from "./pages/ProductListPage";
import { Outlet } from "react-router-dom";
import { AppBarMUI } from "./customComponents/AppBar/AppBarMUI";

function App() {
  return (
    <div className="App">
      <AppBarMUI/>
      <Outlet />
    </div>
  );
}

export default App;
