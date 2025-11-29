import { useState } from "react";
import { api } from "../api/http";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();
  const toast = useToast();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data.token, data.role);
      toast.show("Login realizado!");
      nav("/pacientes");
    } catch (err) {
      toast.show("Falha no login");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-2xl shadow p-6">
      <h1 className="text-xl font-semibold mb-4">Entrar</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="text-sm text-zinc-600">Email</label>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="text-sm text-zinc-600">Senha</label>
          <input type="password" className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button disabled={loading} className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}