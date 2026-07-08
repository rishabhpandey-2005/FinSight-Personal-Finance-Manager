import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`flex ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-100"
      }`}
    >
      <Sidebar />

      <div className="flex-1 min-h-screen">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Settings
          </h1>

          <div
            className={`p-6 rounded-2xl shadow ${
              darkMode
                ? "bg-slate-800"
                : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-5">
              Theme Settings
            </h2>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`px-6 py-3 rounded-lg text-white ${
                darkMode
                  ? "bg-yellow-500"
                  : "bg-slate-900"
              }`}
            >
              {darkMode
                ? "Switch to Light Mode ☀️"
                : "Switch to Dark Mode 🌙"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;