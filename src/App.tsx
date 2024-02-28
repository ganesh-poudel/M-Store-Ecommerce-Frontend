import React from "react";
import "./App.css";
import { ProductListPage } from "./pages/ProductListPage";
import { Outlet } from "react-router-dom";
import { AppBarMUI } from "./customComponents/AppBar/AppBarMUI";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
