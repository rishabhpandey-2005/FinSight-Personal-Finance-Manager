import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaMoneyBill,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <FaMoneyBill />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[60] bg-slate-900 text-white p-3 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative
        z-50
        h-screen
        w-64
        bg-slate-900
        text-white
        p-6
        flex-shrink-0
        overflow-y-auto
        transform
        transition-transform
        duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-white leading-none">
                FinSight
            </h1>

            <p className="text-xs text-slate-400 mt-1 tracking-widest uppercase">
                  Personal Finance Manager
            </p>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300
              ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;