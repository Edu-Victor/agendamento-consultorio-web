import { useEffect, useState } from "react";
import { api } from "../api/http";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Reports() {
  const { isAdmin } = useAuth();
  const [pacientes, setPacientes] = useState([]);
  const [pacienteId, setPacienteId] = useState("");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/api/pacientes").then(({ data }) => setPacientes(data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!pacienteId) { setReports([]); return; }
    api.get(`/api/pacientes/${pacienteId}/reports`).then(({ data }) => setReports(data)).catch(console.error);
  }, [pacienteId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Relatórios</h2>
        {isAdmin && pacienteId && (
          <Link to={`/reports/new?pacienteId=${pacienteId}`} className="px-3 py-2 rounded-lg bg-zinc-900 text-white">
            Adicionar Relatório
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <label className="text-sm text-zinc-600">Selecione o paciente</label>
        <select className="w-full mt-1 px-3 py-2 rounded-lg border"
                value={pacienteId} onChange={e => setPacienteId(e.target.value)}>
          <option value="">-- Escolher --</option>
          {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 text-zinc-700">
            <tr>
              <th className="text-left px-4 py-3">Data</th>
              <th className="text-left px-4 py-3">Tipo</th>
              <th className="text-left px-4 py-3">Humor</th>
              <th className="text-left px-4 py-3">Observações</th>
              <th className="text-right px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">{r.data}</td>
                <td className="px-4 py-3">{r.tipoSessao}</td>
                <td className="px-4 py-3">{r.humor}</td>
                <td className="px-4 py-3 text-zinc-600">{(r.observacoes || "").slice(0, 50)}</td>
                <td className="px-4 py-3 text-right">
                  {isAdmin ? (
                    <Link to={`/reports/${r.id}/edit?pacienteId=${pacienteId}`} className="px-3 py-1 rounded-lg bg-zinc-900 text-white">
                      Editar
                    </Link>
                  ) : <span className="text-zinc-500">Somente leitura</span>}
                </td>
              </tr>
            ))}
            {pacienteId && reports.length === 0 && (
              <tr><td colSpan="5" className="px-4 py-6 text-zinc-500">Nenhum relatório para este paciente.</td></tr>
            )}
            {!pacienteId && (
              <tr><td colSpan="5" className="px-4 py-6 text-zinc-500">Selecione um paciente acima.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}