import React from "react";

import "./DarkModeToggle.css";

function DarkModeToggle({ darkMode, setDarkMode }) {
  const lightIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4" stroke-linejoin="round"/><path stroke-linecap="round" d="M20 12h1M3 12h1m8 8v1m0-18v1m5.657 13.657l.707.707M5.636 5.636l.707.707m0 11.314l-.707.707M18.364 5.636l-.707.707"/></g></svg>;
  const darkIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56"/></svg>;

  return (
    <button
      style={{
        background: darkMode ? "#23242a" : "#fff",
        color: darkMode ? "#fff" : "#131313",
      }}
      className="dark-mode-toggle"
      onClick={() => setDarkMode((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {darkMode ? darkIcon : lightIcon}
    </button>
  );
}

export default DarkModeToggle;
