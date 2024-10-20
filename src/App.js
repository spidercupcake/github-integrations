import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Add other routes as needed */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
