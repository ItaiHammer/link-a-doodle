import React from "react";

function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode((d) => !d)}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: darkMode ? "#23242a" : "#fff",
        color: darkMode ? "#fff" : "#23242a",
        border: "none",
        borderRadius: "20px",
        width: 40,
        height: 40,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        zIndex: 200
      }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}

export default DarkModeToggle;
