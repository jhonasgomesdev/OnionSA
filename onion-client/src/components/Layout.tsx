import { Link, Outlet, useLocation } from "react-router-dom";
import { HomeIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function Layout() {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname === path ? "bg-brand-600 text-white" : "text-brand-100 hover:bg-brand-500/30";

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-700 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-brand-600 flex items-center justify-center">
          <h1 className="text-2xl font-semibold">Onion S.A.</h1>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          <Link
            to="/"
            className={`rounded-lg px-4 py-2 font-medium ${isActive("/")}`}
          >
            <HomeIcon className="inline h-5 w-5 mr-2" />
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`rounded-lg px-4 py-2 font-medium ${isActive("/dashboard")}`}
          >
            <ChartBarIcon className="inline h-5 w-5 mr-2" />
            Dashboard
          </Link>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}