import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import News from "./components/News";

const App = () => {
    return (
      <div>
        <Navbar />
        <News />
      </div>
    );
}

export default App;
