import { useEffect, useState } from "react";
import { api } from "../api/http";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useToast } from "../components/Toast";

export default function pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const { isAdmin } = useAuth();
  const toast = useToast();

  async function load() {
    const { data } = await api.get("/api/pacientes");
    setPacientes(data);
  }

  useEffect(() => { load().catch(console.error); }, []);

  async function remove(id) {
    if (!confirm("Deseja apagar este paciente?")) return;
    try {
      await api.delete(`/api/pacientes/${id}`);
      toast.show("Paciente apagado!");
      load();
    } catch {
      toast.show("Erro ao apagar");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pacientes</h2>
        {isAdmin && (
          <Link to="/pacientes/new" className="px-3 py-2 rounded-lg bg-zinc-900 text-white">
            Adicionar Paciente
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 text-zinc-700">
            <tr>
              <th className="text-left px-4 py-3">Nome</th>
              <th className="text-left px-4 py-3">Idade</th>
              <th className="text-left px-4 py-3">CEP</th>
              <th className="text-right px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(p => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">
                  <Link className="underline" to={`/pacientes/${p.id}`}>{p.nome}</Link>
                </td>
                <td className="px-4 py-3">{p.idade}</td>
                <td className="px-4 py-3">{p.cep}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link to={`/pacientes/${p.id}`} className="px-3 py-1 rounded-lg bg-zinc-200">Detalhes</Link>
                  {isAdmin && (
                    <>
                      <Link to={`/pacientes/${p.id}/edit`} className="px-3 py-1 rounded-lg bg-zinc-900 text-white">Editar</Link>
                      <button onClick={() => remove(p.id)} className="px-3 py-1 rounded-lg bg-red-600 text-white">Apagar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {pacientes.length === 0 && (
              <tr><td className="px-4 py-6 text-zinc-500" colSpan="4">Nenhum paciente cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}