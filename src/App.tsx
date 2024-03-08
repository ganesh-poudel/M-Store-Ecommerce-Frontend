import React from "react";
import "./App.css";
import { ProductListPage } from "./pages/ProductListPage";
import { Outlet } from "react-router-dom";
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
