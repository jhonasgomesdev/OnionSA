import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary-700 text-white min-h-screen flex flex-col shadow-lg">
      <div className="px-6 py-4 text-2xl font-bold border-b border-primary-500">
        Onion S.A.
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-lg transition ${
              isActive
                ? "bg-primary-500 text-white"
                : "hover:bg-primary-600 text-gray-100"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-lg transition ${
              isActive
                ? "bg-primary-500 text-white"
                : "hover:bg-primary-600 text-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>
      </nav>
    </aside>
  );
}