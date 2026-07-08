import { useNavigate } from "react-router-dom";
import { isDarkMode } from "../utils/theme";

function Navbar() {
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("currentUser")
    ) || {};

  const darkMode = isDarkMode();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

  return (
    <div
      className={`shadow p-5 flex justify-between items-center ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white"
      }`}
    >
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">
        <p>
          Hello, {user.name || "User"}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;