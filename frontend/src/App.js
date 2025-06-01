import AnimatedBackground from "./components/AnimatedBackground";
import DarkModeToggle from "./components/DarkModeToggle";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState, useEffect} from "react";

// components
import BuyMeACoffeeButton from "./components/BuyMeACoffeeButton";

// pages
import HomePage from "./pages/Home";
import AnalyticsPage from "./pages/AnalyticsPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") == "true" ? true : false
  );
  const [loggedEasterEgg, setLoggedEasterEgg] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // easter egg
  if (!loggedEasterEgg) {
    const easterEgg = `
%c __   ____ _  _ _  _      __      ____ _____ _____ ____ __   ____ 
(  ) (_  _( \\( ( )/ )    /__\\    (  _ (  _  (  _  (  _ (  ) ( ___)
)(__ _)(_ )  ( )   (    /(__)\\    )(_) )(_)( )(_)( )(_) )(__ )__) 
(____(____(_)/_(_)/_)  (__)(__)  (____(_____(_____(____(____(____)
    `;

    console.log(
      easterEgg,
      "color: #da667b; font-size: 10px; font-weight: bold;"
    );
    setLoggedEasterEgg(true);
  }

  return (
    <>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <AnimatedBackground darkMode={darkMode} />
      <BuyMeACoffeeButton />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          <Route
            path="/analytics/:key"
            element={<AnalyticsPage darkMode={darkMode} />}
          />
          <Route path="/error" element={<ErrorPage darkMode={darkMode} />} />
          <Route path="/*" element={<ErrorPage darkMode={darkMode} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
