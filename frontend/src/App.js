import AnimatedBackground from "./components/AnimatedBackground";
import DarkModeToggle from "./components/DarkModeToggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// pages
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") == "true" ? true : false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <AnimatedBackground darkMode={darkMode} />
      <Router>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/analytics/:key" element={<Analytics darkMode={darkMode} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
