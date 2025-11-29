import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Layout() {
  const { role, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    "px-3 py-2 rounded-lg " + (isActive ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100");

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Consultório • Agendamentos</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-600">{role}</span>
            <button onClick={logout} className="text-sm px-3 py-2 rounded-lg bg-zinc-900 text-white">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <nav className="flex gap-2 mb-6">
          <NavLink to="/pacientes" className={linkClass}>Pacientes</NavLink>
          <NavLink to="/reports" className={linkClass}>Relatórios</NavLink>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}